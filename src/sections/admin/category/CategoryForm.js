import { addHours } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { TimePicker } from '@mui/x-date-pickers';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Divider,
  useTheme,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import ReactInputMask from 'react-input-mask';
// config
import { DEFAULT_COLOR, DEFAULT_GENDER, SERVICE_HOURS, SERVICE_MINS } from '../../../config';
// validation
import { SERVICE_VALIDATION_RULES } from '../../../validation';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { createService, updateService } from '../../../redux/slices/service';
// routes
import { PATH_AGENCY } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
import { fileToBaseURL } from '../../../utils/base64';
import { concatTime, fPostDate, shouldTime } from '../../../utils/formatTime';
// components
import LoadingScreen from '../../../components/LoadingScreen';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFUploadAvatar, RHFCheckbox, RHFSelect, RHFAutocomplete } from '../../../components/hook-form';
// ----------------------------------------------------------------------

ServiceForm.propTypes = {
  isEdit: PropTypes.bool,
  onBack: PropTypes.func,
  currentService: PropTypes.object,
};

export default function ServiceForm({ isEdit, onBack, currentService }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const [isLoading, setLoading] = useState(false);
  const [shouldDisable, setShouldDisable] = useState({ mins: false, serviceTo: false });
  const { isLoading } = useSelector((state) => state.service);
  const { nameRule } = SERVICE_VALIDATION_RULES;
  const { user } = useAuth();

  const EventSchema = Yup.object().shape({
    name: Yup.string()
      .required(`Service Name ${nameRule.required.message}`)
      .matches(nameRule.pattern.value, nameRule.pattern.message)
      .test('len', `Service Name ${nameRule.min.message}`, (val) => val.toString().length >= nameRule.min.value),
    price: Yup.string()
      .nullable()
      .required('Price is required')
      .test('len', 'Price must be less than or equal then 6 characters', (val) => val.toString().length <= 6)
      .test('is-decimal', 'Please enter valid price 0.00', (val) => /^\d+(\.\d{0,2})?$/.test(val)),
    startTime: Yup.string().nullable().required('Service From is required'),
    endTime: Yup.string().nullable().required('Service To is required'),
    color: Yup.string().required('Color is required'),
    isEditable: Yup.boolean(),
  });

  const defaultValues = useMemo(() => {
    const emptyHrs = {
      id: '',
      value: '',
      name: '',
    };

    const emptyMins = {
      id: '',
      value: '',
      name: '',
    };

    return {
      name: currentService?.name || "",
      days: currentService?.days || null,
      hrs: currentService?.hrs || emptyHrs,
      mins: currentService?.mins || emptyMins,
      duration: currentService?.duration || null,
      startTime: (currentService?.startTime && concatTime(currentService?.startTime)) || shouldTime(),
      endTime: (currentService?.endTime && concatTime(currentService?.endTime)) || addHours(shouldTime(), 1),
      priceType: currentService?.priceType || "hourly",
      price: currentService?.price || "",
      color: currentService?.color || DEFAULT_COLOR[0],
      image: currentService?.imageUrl || "",
      isEditable: currentService?.isEditable || true,
    }
  },
    [currentService]
  );

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentService) {
      reset(defaultValues);
    }
  }, [isEdit, currentService]);

  useEffect(() => {
    if (values?.hrs?.value === '24') {
      setValue('mins', { id: '0', value: '00', name: '00 Mins' });
      setValue('endTime', values?.startTime);
      setShouldDisable({ ...shouldDisable, mins: true, serviceTo: true })
    } else {
      setShouldDisable({ ...shouldDisable, mins: false, serviceTo: false });
    }
  }, [values?.hrs]);

  const HourOnChange = (e, value) => {
    if (value) {
      setValue('hrs', value);
    }
    return value;
  };

  const MinOnChange = (e, value) => {
    if (value) {
      setValue('mins', value);
    }
    return value;
  };

  const startTimeOnChange = (value) => {
    if (value) {
      setValue(`startTime`, value);

      if (values?.hrs?.value === '24') {
        setValue('endTime', value);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let baseURL = currentService?.image;
      if (typeof data.image === 'object' && data.image) {
        baseURL = await fileToBaseURL(data.image);
      }
      data.image = baseURL;
      data.endTime = fPostDate(data.endTime);
      data.startTime = fPostDate(data.startTime);
      data.days = (data.days === "" || data.days === "0") ? null : data.days;
      data.duration = `${data?.hrs?.value || "00"}:${data?.mins?.value || "00"}`;
      data.duration = data.duration === "00:00" ? null : data.duration;
      data.price = Number(data.price);

      if (data?.hrs?.value >= 24 && !data.days) {
        data.days = 1;
      }


      if (!isEdit) {
        dispatch(createService(data))
          .then((originalPromiseResult) => {
            reset();
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            navigate(PATH_AGENCY.service.list);
          })
          .catch((rejectedValueOrSerializedError) => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
          });
      } else {
        data.id = currentService?.id;
        dispatch(updateService(data, { autoHideDuration: 5000 }))
          .then((originalPromiseResult) => {
            reset();
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            navigate(PATH_AGENCY.service.list);
          })
          .catch((rejectedValueOrSerializedError) => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
          });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box>
              <RHFUploadAvatar
                name="image"
                accept="image/png, image/jpeg, image/jpg"
                maxSize={3000000}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png
                    <br /> max size of {fData(3000000)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <Stack divider={<Divider flexItem sx={{ my: 2 }} />}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    my: 1,
                    color: `${theme.palette.primary.main}`,
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  Service Information
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                  }}
                >
                  <RHFTextField name="name" label="Service Name" inputProps={{ maxLength: 50 }} autoFocus />
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                  }}
                >
                  <RHFTextField name="days" label="Days" type="number" inputProps={{ maxLength: 50 }} />

                  <RHFAutocomplete
                    name={`hrs`}
                    label="Duration - Hrs"
                    options={SERVICE_HOURS}
                    optionLabel={(item) => item?.name || ""}
                    inputChange={HourOnChange}
                  />
                  <RHFAutocomplete
                    name={`mins`}
                    label="Duration - Min"
                    disabled={shouldDisable?.mins}
                    options={SERVICE_MINS}
                    optionLabel={(item) => item?.name || ""}
                    inputChange={MinOnChange}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >

                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TimePicker
                        {...field}
                        minutesStep={15}
                        label="Service From"
                        inputFormat="hh:mm a"
                        shouldDisableTime={(timeValue, clockType) => clockType === 'minutes' && timeValue % 15}
                        onChange={startTimeOnChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={error ? error?.message : ''}
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TimePicker
                        {...field}
                        minutesStep={15}
                        label="Service To"
                        inputFormat="hh:mm a"
                        disabled={shouldDisable?.serviceTo}
                        shouldDisableTime={(timeValue, clockType) => clockType === 'minutes' && timeValue % 15}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={error ? error?.message : ''}
                            onKeyDown={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
                      />
                    )}
                  />

                  <RHFTextField
                    name="price"
                    label="Price/Hour"
                    onChange={(event) => setValue('price', event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {user?.currency}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Select
                            value={values.priceType}
                            onChange={(event) => setValue('priceType', event.target.value)}
                            disableUnderline
                            sx={{
                              border: 'none',
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                              },
                              mr: -1.7,
                              fontSize: '0.875rem', // Adjust font size if needed
                            }}
                          >
                            <MenuItem value="hourly">Hourly</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                          </Select>
                        </InputAdornment>
                      ),
                      type: 'number',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateRows: { sm: 'repeat(1, 1fr)' },
                    }}
                  >
                    <Controller
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <ColorSinglePicker value={field.value} onChange={field.onChange} colors={DEFAULT_COLOR} />
                      )}
                    />
                  </Box>
                </Box >
              </Stack >
            </Box >

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1.5}
              sx={{
                mt: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                },
              }}
            >
              <Stack>
                {/* <RHFCheckbox name="isEditable" label="Is booking hours editable?" /> */}
              </Stack>
              <Stack direction="row">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onBack}
                  sx={{
                    mr: 1,
                  }}
                >
                  Back
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  {!isEdit ? 'Submit' : 'Submit'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card >
        </Grid >
      </Grid >
    </FormProvider >
  );
}
