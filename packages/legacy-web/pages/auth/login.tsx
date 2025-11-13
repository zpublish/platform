import Head from 'next/head';
import Link from 'next/link';
import { Box, Text, Row } from 'elemental-react';
import { Button } from '@elemental-zcash/components';
import InputField from '@elemental-zcash/components/lib/forms/InputField';
import TextInput from '@elemental-zcash/components/lib/forms/TextInput';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "../api/auth/[...nextauth]";

import Section from '../../components/common/Section';
// import SignupForm from '../../components/auth/signup-form';
import { useRouter } from 'next/router';
// import GET_VIEWER from '../../graphql/queries/viewer';
import { useQuery } from '@apollo/client';
// import useViewer from '../../lib/hooks/use-viewer';
import { useEffect } from 'react';
import { config } from '../../config';
import useIsLoggedIn from '../../lib/hooks/use-is-logged-in';


export default function Login({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  // const { loading, viewer } = useViewer();
  const loading = false;
  const isLoggedIn = useIsLoggedIn();
  const session = useSession();
  // const viewer = { __typename: '', user: { id: '' } };
  // const { loading, data, error, client } = useQuery<{ viewer: Viewer | ViewerNotFoundError }>(GET_VIEWER);

  useEffect(() => {
    if (loading) {
      return;
    }
    console.log({ session })
    if (!isLoggedIn && session?.status === 'unauthenticated') {
      signIn('elemental-sso', { callbackUrl: 'http://127.0.0.1:3030/' })
      // // const { scope, client_id, callback_uri } = router.query;
      // const redirect_uri = new URL(window.location.href).origin; // FIXME:
      // router.replace({
      //   pathname: `${config.SSO_URL}/oauth/authorize`,
      //   // ?response_type=code&scope=profile&client_id=${clientId}&redirect_uri=https://elemental-pay.local/auth/callback
      //   query: {
      //     response_type: 'code',
      //     scope: 'email zcashaddress profile',
      //     client_id: config.SSO_CLIENT_ID,
      //     redirect_uri: `${redirect_uri}/auth/callback`,
      //   }
      // })
    } else {
      router.push('/');
    }
  }, [isLoggedIn, session])

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
      </Section>
    </Box>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}

// export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <>
//       {Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button onClick={() => signIn(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ))}
//     </>
//   )
// }

