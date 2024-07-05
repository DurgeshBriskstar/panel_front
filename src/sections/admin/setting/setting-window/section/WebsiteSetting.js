import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// hooks
import useTabs from 'src/hooks/useTabs';
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
// sections
import { WebsiteGeneral, WebsiteSocialLinks } from './website';
import { useDispatch, useSelector } from 'src/redux/store';
import { getWebInfo } from 'src/redux/slices/webInfo';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function WebsiteSetting() {
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs('general');
  const dispatch = useDispatch();
  const { isLoading, webInfo } = useSelector((state) => state.webInfo);

  useEffect(() => {
    dispatch(getWebInfo());
  }, []);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <WebsiteGeneral isLoading={isLoading} webInfo={webInfo} />,
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <WebsiteSocialLinks isLoading={isLoading} webInfo={webInfo} />,
    },
  ];


  return (
    <Page title="Settings: Website">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
          sx={{ background: '#edeff1', px: 2, borderRadius: 0.5 }}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
