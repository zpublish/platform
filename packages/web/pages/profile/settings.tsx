import Head from 'next/head';
import Link from 'next/link';
import { Box, Row } from 'elemental-react';
import { AutoTextArea, Button, TextInput, InputField } from '@elemental-zcash/components';

import Layout from '../../components/Layout';
import Section from '../../components/common/Section';
import Text, { TextLink } from '../../components/common/Text';
// import { Text, TextLink } from '../../components/common';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';

import { Formik } from 'formik';
import { getErrorCode } from '../../graphql/utils';
import { graphql } from '../../graphql/types';
import { ViewerQuery } from '../../graphql/types/graphql';
// import RegisterForm from '../components/register/register-form';

interface UpdateUserSuccess {
  user: {
    id: string,
    socials: {
      twitter: string,
      youtube: string,
    },
  }
}

interface UpdateUserError {
  message: string,
  code: string,
}

const UserSettingsFragment = gql`
  fragment UserSettingsFragment on User {
    email
    name
    username
    publicZcashaddress
    zcashaddress
    bio
    viewingKey
  }
`;

const GET_VIEWER_QUERY = graphql(`
  query Viewer {
    viewer {
      id
      email
      name
      username
      publicZcashaddress
      zcashaddress
      bio
      socials {
        instagram
        youtube
        twitter
        website
      }
      viewingKey
    }
  }
`);

const UPDATE_USER = graphql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      __typename
      ...on UpdateUserSuccess {
        user {
          id
          username
          unverifiedEmail
          isVerifiedEmail
        }
      }
      ...on UpdateUserInputError {
        message
        code
      }
    }
  }
`)


export default function ProfileSettings() {
  const { loading, data, error, client } = useQuery(GET_VIEWER_QUERY);
  const [updateUser, { loading: loadingUpdateUser, data: updateUserData, error: updateUserError }] = useMutation(UPDATE_USER);
  // const updateUser: any = () => {};

  const { code: errorCode, message: errorMessage }: { code?: string, message?: string } = getErrorCode(updateUserError);

  const userData = data?.viewer?.__typename === 'User' && data.viewer;

  // const [sendVerificationEmail, { data: verificationData, loading: verificationLoading, error: verificationError }] = useMutation<{ sendVerificationEmail: boolean }, { address: string }>(SEND_VERIFICATION_EMAIL);


  return (
    <Box flex={1} justifyContent="center" alignItems="center" minHeight="100vh">
      <Head>
        <title>Elemental Zcash SSO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section width="100%" maxWidth={640}>
        {/* <RegisterForm /> */}
        <Box mt={20} alignItems="center">
          {data?.viewer?.__typename === 'User' && userData ? (
            <Box>
              {((data.viewer as any).isVerifiedEmail as any || true) ? (
                <Box>
                  <Text fontSize={24} bold mb={20}>
                    Settings
                  </Text>
                  <Formik
                    initialValues={{
                      name: userData?.name || '', bio: userData?.bio || '',
                      username: userData?.username || '', twitter: userData?.socials?.twitter || '', youtube: userData?.socials?.youtube,
                      instagram: userData?.socials?.instagram || '', website: userData?.socials?.website || '',
                      zcashaddress: userData?.zcashaddress, viewingKey: userData?.viewingKey }}
                    // validate={(values) => {
                    //   const errors = {};

                    //   return errors;
                    // }}
                    // validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                      if (userData && !userData?.id) {
                        return;
                      }
                      try {
                        const { data: _, errors } = await updateUser({
                          variables: {
                            input: {
                              id: userData.id,
                              user: { name: values.name, bio: values.bio,
                                username: values.username, socials: { twitter: values.twitter, youtube: values.youtube,
                                instagram: values.instagram, website: values.website }, zcashaddress: values.zcashaddress,
                                viewingKey: values.viewingKey,
                              }
                            },
                          },
                        })
                      } catch(err) {
                        // noop
                      }
                      // console.log({ _ })
                      // await updateUser({
                      //   variables: {}
                      // });
                      // const { data: mutationData, errors } = await login({
                      //   variables: { input: { email: values.email, password: values.password } },
                      // });
                      // if (!errors && mutationData?.login?.__typename === 'LoginSuccess') {
                      //   const loginUser = mutationData.login.user;
                      //   const loginCode = mutationData.login.code;

                      //   if (loginCode) {
                      //     await getToken(loginCode);
                      //   }
                      // } 
                    }}
                  >
                    {({ values, setFieldValue, errors, touched, handleChange, handleSubmit }) => (
                      <Box flex={1}>
                        {/* <Text center bold fontSize={24} mb={3}>Welcome Back</Text> */}
                        {(error || errorCode || errorMessage) && (
                          <Box>
                            <Text mb={20} color="error">{`Error: ${error?.message || errorMessage || errorCode}`}</Text>
                          </Box>
                        )}
                        {[
                          { id: 'name', label: 'Name' },
                          { id: 'username', label: 'Username' },
                          { id: 'zcashaddress', label: 'Zcash Address' },
                          { id: 'bio', label: 'Bio' },
                          { id: 'viewingKey', label: 'Viewing Key' },
                          { id: 'website', label: 'Website' },
                          { id: 'twitter', label: 'Twitter Username' },
                          { id: 'youtube', label: 'YouTube' },
                          { id: 'instagram', label: 'Instagram' },
                        ].map(({ id, label }) => (
                          <Box key={id}>
                            <InputField
                              width="100%"
                              label={label}
                              error={touched[id] && errors[id]}
                              value={values[id]}
                            >
                              {({ label, value }) =>
                                (['bio', 'viewing-key'].includes(id)) ? (
                                  <AutoTextArea
                                    onChangeText={text => setFieldValue(id, text)}
                                    placeholder={label}
                                    // label={label}
                                    // error={touched[id] && errors[id]}
                                    value={values[id]}
                                  />
                                ) : (
                                  <TextInput
                                  placeholder={label}
                                  // @ts-ignore
                                  value={value}
                                  onChange={handleChange(id)}
                                  // onChangeText={(text) => {
                                  //   setFieldValue('username', text);
                                  // }}
                                  pb={0}
                                  px={3}
                                  borderWidth={1}
                                  borderRadius={4}
                                  height={40}
                                  borderColor="#e2e2f2"
                                />
                                )
                              }
                            </InputField>
                          </Box>
                        ))}
                        {/* {[
                          { id: 'name', label: 'Name' },
                          { id: 'username', label: 'Username' },
                          { id: 'zcashaddress', label: 'Zcash Address' },
                          { id: 'bio', label: 'Bio' },
                          { id: 'website', label: 'Website' },
                          { id: 'twitter', label: 'Twitter Username' },
                          { id: 'youtube', label: 'YouTube' },
                          { id: 'instagram', label: 'Instagram' },
                          // { id: 'instagram', label: 'Instagram' },
                          ].map(({ id, label: fieldLabel }) => (
                            <Box flex={1}>
                              <InputField
                                width="100%"
                                label={fieldLabel}
                                error={touched[id] && errors[id]}
                                value={values[id]}
                              >
                                {({ label, value }) =>
                                  {(
                                    <TextInput
                                      // as=""
                                      placeholder={label}
                                      // @ts-ignore
                                      value={value}
                                      onChange={handleChange(id)}
                                      pb={0}
                                      px={3}
                                      borderWidth={1}
                                      borderRadius={4}
                                      height={40}
                                      borderColor="#e2e2f2"
                                    />
                                  )
                                }}
                              </InputField>
                            </Box>
                          ))} */}
{/*                         
                        <Box>
                          <PasswordField
                            error={touched.password && errors.password}
                            value={values.password}
                            label="Password"
                            onChange={handleChange('password')}
                          />
                        </Box> */}
                        <Box>
                          <Link href="/">
                            <TextLink m={0} mb={20} color="blue">
                              {'< Back to home'}
                            </TextLink>
                          </Link>
                          <Button style={{ cursor: 'pointer' }} onPress={handleSubmit} m={0} minWidth={128}>UPDATE PROFILE</Button>
                        </Box>
                      </Box>
                    )}
                  </Formik>
                </Box>
              ) : (
                <>
                </>
              )}
            </Box>
          ) : (
            <Row flex={1}>
              <Text style={{ display: 'inline' }}>
                {'Redirecting to Login'}
                {/* <Link href="/auth/login">
                  <Text color="blue" style={{ display: 'inline' }}>Sign In</Text>
                </Link> */}
              </Text>
            </Row>
          )}
        </Box>
      </Section>
    </Box>
  )
}
