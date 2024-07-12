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
import { AccountChangePassword, AccountGeneral, AccountSocialLinks } from './account';

// ----------------------------------------------------------------------

export default function UserAccount({ isEdit, user }) {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral isEdit={isEdit} userInfo={user} />,
      show: true
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountSocialLinks isEdit={isEdit} userInfo={user} />,
      show: isEdit
    },
    {
      value: 'security',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword isEdit={isEdit} userInfo={user} />,
      show: isEdit
    },
  ];

  return (
    <Page title="Settings: Account">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
          sx={{ background: '#edeff1', px: 2, borderRadius: 1 }}
        >
          {ACCOUNT_TABS.map((tab) => tab.show && (
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
