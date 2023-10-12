import Head from 'next/head';
import Link from 'next/link';
import { Box, Text, Row } from 'elemental-react';
import { Button } from '@elemental-zcash/components';
import InputField from '@elemental-zcash/components/lib/forms/InputField';
import TextInput from '@elemental-zcash/components/lib/forms/TextInput';

import Section from '../../components/common/Section';
// import SignupForm from '../../components/auth/signup-form';
import { useRouter } from 'next/router';
// import GET_VIEWER from '../../graphql/queries/viewer';
import { useQuery } from '@apollo/client';
// import useViewer from '../../lib/hooks/use-viewer';
import { useEffect } from 'react';
import { config } from '../../config';
import useIsLoggedIn from '../../lib/hooks/use-is-logged-in';


export default function Signup() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const loading = false;
  // const viewer = { __typename: '', user: { id: '' } };
  // const { loading, data, error, client } = useQuery<{ viewer: Viewer | ViewerNotFoundError }>(GET_VIEWER);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!isLoggedIn) {
      const callback_uri = new URL(window.location.href).origin; // FIXME: 
      router.replace({
        pathname: `${config.SSO_URL}/auth/signup`,
        query: {
          response_type: 'code',
          scope: 'email zcashaddress profile',
          client_id: config.SSO_CLIENT_ID,
          callback_uri: callback_uri,
        },
      })
    } else {
      router.push('/');
    }
  }, [loading])

  return (
    <Box flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
      <Head>
        <title>Signup | Elemental Pay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section width="100%" maxWidth={640}>
        <Box borderWidth={1} borderColor="#e2e2f2" borderRadius={4} p={40} flex={1}>
          <Box alignItems="center">
            <Box borderRadius={4} width={300} height={64} mb={20} bg="greys.1" />
            <Box borderRadius={4} width={300} height={64} mb={20} bg="greys.1" />
            <Box borderRadius={4} width={300} height={64} mb={20} bg="greys.1" />
          </Box> 
        </Box>
        {/* <SignupForm />
        <Box mt={20} alignItems="center">
          <Row flex={1}>
            <Text style={{ display: 'inline' }}>
              {'Already have an account? '}
              <Link href="/auth/login">
                <Text color="blue" style={{ display: 'inline', cursor: 'pointer' }}>Sign In</Text>
              </Link>
            </Text>
          </Row>
        </Box> */}
      </Section>
    </Box>
  )
}
