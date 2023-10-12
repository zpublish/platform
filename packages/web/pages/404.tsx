import Head from 'next/head';
import { Box, Text, Row, Button as _Button } from 'elemental-react';

import Layout from '../components/Layout';
import Section from '../components/common/Section';
// import RegisterForm from '../components/register/register-form';


export default function NotFound() {
//   const { loading, data, error, client } = useQuery<{ viewer: Viewer | ViewerNotFoundError }>(GET_VIEWER);
  // const [sendVerificationEmail, { data: verificationData, loading: verificationLoading, error: verificationError }] = useMutation<{ sendVerificationEmail: boolean }, { address: string }>(SEND_VERIFICATION_EMAIL);
  // const apolloClient = useApolloClient();


  return (
    <Box flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
      <Head>
        <title>ZPublish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Section minHeight="75vh" justifyContent="center" alignItems="center" bg="black">
          <Text fontSize={40} color="white" mb={32}>Error 404 – Not Found</Text>
          {/* <Row>
            <Box>
              <Text fontFamily="IBM Plex Sans" color="white" fontSize={32} lineHeight={40} mb={20}>Accept Crypto Payments</Text>
              <Text fontFamily="IBM Plex Sans" color="white" fontSize={20} lineHeight={24} mb={16}>Accept crypto payments online on your own website, in person or by email.</Text>
              {['Non custodial – bring your own wallet.', 'Private – accept Zcash', 'Simple'].map((txt, i) => (
                <Text key={i} fontFamily="IBM Plex Sans" color="white" fontSize={20} mb="12px">{`- ${txt}`}</Text>
              ))}
              <Link href="/pay/checkout">
                <Button minWidth={156} mt={20} height={52} style={{ cursor: 'pointer' }}>
                  <_Button.Text fontFamily="mono" fontWeight="bold" color="#003796">START DEMO</_Button.Text>
                </Button>
              </Link>
            </Box>
            <Box width="40%" /> */}
          {/* </Row> */}
        </Section>
      </Layout>
    </Box>
  )
}
