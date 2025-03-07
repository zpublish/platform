import Head from 'next/head';
import Link from 'next/link';
import { Box, Row, ThemeProvider } from 'elemental-react';
import { AutoTextArea, Button, TextInput, InputField, CryptoAddressCopy, theme, QRCode, Select } from '@elemental-zcash/components';
import * as Yup from 'yup';
// import { Text, TextLink, Section } from '#components';
import Text, { TextLink } from '../../components/common/Text';
import Section from '../../components/common/Section';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
// @ts-ignore
import { InvoiceElement } from '@elemental-pay/components';



import { Formik } from 'formik';
import { getErrorCode } from '../../graphql/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Svg, { Path } from '@react-platform/svg';
import { copyTextToClipboard, toBase64 } from '../../utils';
import { graphql } from '../../graphql/types';
import UserInvoice from '../../components/invoices/UserInvoice';
// import UserLiveInvoice from '../../components/invoices/UserLiveInvoice';
// import UserStaticInvoice from '../../components/invoices/UserStaticInvoice';
import Layout from '../../components/Layout';
import { CurrencyCode } from '../../graphql/types/graphql';


const makeLink = (id, value) => {
  switch(id) {
    case 'twitter': {
      return `https://twitter.com/${value}`;
    }
    case 'instagram': {
      return `https://instagram.com/${value}`;
    }
    case 'youtube': {
      return `https://youtube.com/${value}`;
    }
    case 'website': {
      if (!value.includes['https://'] && !value.includes('http://')) {
        return `https://${value}`; // Should we be forcing https? :D
      }
      return value;
    }
    default: {
      return '';
    }
  }
};

const ChooseAmountSchema = Yup.object().shape({
  amount: Yup.number().required('Required'),
  currency: Yup.string()
    // .min(8, 'Too short!')
    // .max(999, 'Too long!')
    .required('Required'),
});

const CloseIcon = ({ color = '#000', size = 24 }) => (// @ts-ignore
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={size} width={size}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill={color} />
  </Svg>
);

const WalletButtonContainer = ({ href, children, ...props }) => (
  <a href={href} style={{ display: 'flex', flex: 1 }} {...props}>
    {children}
  </a>
)

enum InvoiceStage {
  CHOOSE_AMOUNT = 'CHOOSE_AMOUNT',
  INVOICE = 'INVOICE',
  INVOICE_PAID = 'INVOICE_PAID',
};

const GET_USER = graphql(`
  query user($id: ID!) {
    user(id: $id) {
      __typename
      ...on User {
        id
        username
        name
        bio
        zcashaddress
        socials {
          youtube
          instagram
          twitter
          website
        }
      }
      ...on UserNotFoundError {
        message
        code
      }
    }
  }
`)

const CREATE_INVOICE = graphql(`
  mutation createInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      id
      invoiceId
      status
      price
      currency
    }
  }
`)

export default function User() {
  
  const router = useRouter();
  const { id, invoice_id, amount: initialAmount = 0.1, currency: initialCurrency = CurrencyCode.Zec } = router.query;
  const { loading, data, error, client } = useQuery(GET_USER, { variables: { id: String(id) }});
  const [showQrCode, setShowQrCode] = useState(false);
  const [invoiceStage, setInvoiceStage] = useState<InvoiceStage | null>(null);
  const [amount, setAmount] = useState(initialAmount);
  const [memo, setMemo] = useState('');
  // const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  // const [currency, setCurrency] = useState(initialCurrency);
  // const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [createInvoice] = useMutation(CREATE_INVOICE);
  // const [updateUser, { loading: loadingUpdateUser, data: updateUserData, error: updateUserError }] = useMutation<{ updateUser: UpdateUserSuccess | UpdateUserError }>(UPDATE_USER);

  const userData = data?.user?.__typename === 'User' ? data.user : null;
  // const { code: errorCode, message: errorMessage }: { code?: string, message?: string } = getErrorCode(error, data?.viewer as ViewerNotFoundError);

  // // const [sendVerificationEmail, { data: verificationData, loading: verificationLoading, error: verificationError }] = useMutation<{ sendVerificationEmail: boolean }, { address: string }>(SEND_VERIFICATION_EMAIL);
  // const apolloClient = useApolloClient();

  const { twitter, instagram, youtube, website } = userData?.socials || {};
  const currencyOptions = [{ label: 'ZEC', value: 'ZEC' }];

// <InvoiceElement />
  // const amount = 0;
  // const memo = 0;
  return (
    <Layout>
      <Box flex={1} justifyContent="center" alignItems="center" minHeight="100vh" minWidth="100vw">
        <Head>
          <title>Elemental Zcash SSO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <InvoiceElement /> */}

        <Section width="100%" maxWidth={640}>
          {/* <RegisterForm /> */}
          <Box mt={20} flex={1} minHeight="50vh" width="100%" alignItems="center">
            {loading && (
              <></>
            )}
            {error && (
              <Box>
                <Text>Not authorized. Please login.</Text>
              </Box>
            )}
            {userData?.id ? (
              <Box flex={1} width="100%" p={40} borderRadius={20} bg="#f0f0f0f0" position="relative">
                {invoiceStage && userData?.zcashaddress && (
                  <Box position="fixed" width="100%" left={0} top={0} height="100%" zIndex={9999} bg="white" alignItems="center" justifyContent="center">
                    <Box
                      onPress={() => {
                        if (invoiceStage === InvoiceStage.INVOICE_PAID && invoice_id) {
                          router.replace({
                            query: { id },
                          });
                        }
                        setInvoiceStage(null);
                      }}
                      position="absolute" zIndex={99999} right={32} top={32} style={{ cursor: 'pointer' }}
                    >
                      <CloseIcon size={64} />
                    </Box>
                    {{
                      [InvoiceStage.CHOOSE_AMOUNT]: (
                        <Formik
                          initialValues={{ amount: amount, currency: initialCurrency, memo: 'Sent From Elemental Zcash' }}
                          validationSchema={ChooseAmountSchema}
                          onSubmit={async (values) => {
                            if (!userData.zcashaddress) { return; }
                            const { data } = await createInvoice({
                              variables: { input: { address: userData.zcashaddress, currency: CurrencyCode.Zec, price: Number(values.amount) }},
                              // onCompleted: (data) => {
                              //   const newInvoiceId = data?.createInvoice?.id;
                              //   if (newInvoiceId) {
                              //     setInvoiceId(newInvoiceId); // Update the invoiceId in the state
                              //     setShouldStartPolling(true);
                              //   }
                              // },
                              // onError: (error) => {
                              //   console.error('Error creating invoice:', error);
                              // },
                        
                            })
                            if (data?.createInvoice?.id) {
                              // setInvoiceId(data.createInvoice.id);
                              // router.push({
                              //   pathname: router.pathname,
                              //   query: { invoice_id: data.createInvoice.id },
                              // })
                              router.replace({
                                query: { ...router.query, invoice_id: data.createInvoice.id, amount: values.amount },
                             });
                            }
                            setInvoiceStage(InvoiceStage.INVOICE);
                            setAmount(values.amount);
                            setMemo(toBase64(unescape(encodeURIComponent(values.memo))).replace('=', ''));
                            // setCurrency(values.currency);
                          }}
                        >
                          {({ values, setFieldValue, errors, touched, handleChange, handleSubmit }) => (
                            <>
                              {values.amount && (
                                <Box>
                                  <Text center fontSize={32} mb={40}>
                                  {`SEND ${values.amount} ${values.currency}`}{'\n'}
                                  {`TO @${userData?.username || userData?.name || userData?.id}`}
                                  </Text>
                                </Box>
                              )}
                            <Box>
                              <InputField
                                width="100%"
                                label="Amount"
                                error={touched.amount && errors.amount}
                                value={values.amount}
                              >
                                {({ label, value }) =>
                                  <TextInput
                                    placeholder={label}
                                    // @ts-ignore
                                    value={value}
                                    onChange={handleChange('amount')}
                                    pb={0}
                                    px={3}
                                    borderWidth={1}
                                    borderRadius={4}
                                    height={40}
                                    borderColor="#e2e2f2"
                                  />
                                }
                              </InputField>
                              <InputField
                                width="100%"
                                label="Memo"
                                error={touched.memo && errors.memo}
                                value={values.memo}
                              >
                                {({ label, value }) =>
                                  <AutoTextArea
                                    onChangeText={text => setFieldValue('memo', text)}
                                    placeholder={label}
                                    // label={label}
                                    // error={touched[id] && errors[id]}
                                    value={values['memo']}
                                  />
                                }
                              </InputField>
                              <Text bold fontWeight="bold" mb={12}>
                                {'Currency: '}
                              </Text>{/* @ts-ignore */}
                              <Select defaultValue={currencyOptions[0]} options={currencyOptions} />
                            
                              <Button mt={24} m={0} disabled={touched.amount && errors.amount || errors.currency} onPress={handleSubmit}>NEXT</Button>
                            </Box>
                            </>
                          )}
                        </Formik>
                      ),
                      [InvoiceStage.INVOICE]: (
                        <>
                          <Section width="100%" maxWidth={640}>
                            {/* <InvoiceElement
                              currency="ZEC"
                              amount={amount}
                              address={userData?.zcashaddress}
                              memo={memo}
                              onCopyPress={async () => {
                                if (!userData.zcashaddress) {
                                  return;
                                }
                                await copyTextToClipboard(`zcash:${userData.zcashaddress}?amount=${amount}&memo=${memo}`);
                              }}
                              onPaymentSuccess={() => {}}
                              // currency=
                              components={{
                                WalletButtonContainer: (props) => <WalletButtonContainer href={`zcash:${userData?.zcashaddress}?amount=${amount}&memo=${memo}`} {...props} />
                              }}
                            /> */}
                            <UserInvoice
                              id={invoice_id}
                              price={amount}
                              zcashaddress={userData?.zcashaddress}
                              memo={memo}
                              onPaymentSuccess={() => {
                                // setPaymentSuccessful(true);
                                setInvoiceStage(InvoiceStage.INVOICE_PAID);
                              }}
                            />
                          </Section>
                        </>
                      ),
                      [InvoiceStage.INVOICE_PAID]: (
                        <Box>
                          <Text fontSize={24}>Success! The donation has been paid.</Text>
                        </Box>
                      )
                    }[invoiceStage]}
                  </Box>
                )}
                {/* {showQrCode && userData?.zcashaddress && (
                  <Box position="fixed" width="100%" left={0} top={0}height="100%" zIndex={9999} bg="#0e0e0e" alignItems="center" justifyContent="center">
                    <Row justifyContent="flex-end">
                      <Button onPress={() => setShowQrCode(false) } color="black">CLOSE</Button>
                    </Row>
                    <Box width="64%" height="64%" justifyContent="center" alignItems="center">
                      <QRCode
                        backgroundColor="transparent"
                        color="#fff"
                        includeMargin={true}
                        // style={{ width: width * 0.55, height: width * 0.55, maxHeight: 512, maxWidth: 512 }}
                        style={{
                          flex: 1, width: '100%', height: '100%', fill: 'transparent'
                        }}
                        sizeWeb="100%"
                        // value={`zcash:${zaddr}?amount=0.001&memo=${memo}`}
                        value={`zcash:${userData.zcashaddress}?amount=${amount}&memo=${memo}`}
                      />
                    </Box>
                  </Box>
                )} */}
                {userData?.username && <Text center bold fontSize={24} mb={12}>{`@${userData.username}`}</Text>}
                {/* {userData.socials} */}
                {userData.zcashaddress && (
                  <Box mb={20}>{/* @ts-ignore */}
                    <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, icons: { ...theme.colors.icons, qrcode_box: '#fff' } }}}>
                      <Text fontSize={16} mt={12}>
                        Zcash Address:
                      </Text>
                      <CryptoAddressCopy
                        color="blue"
                        address={userData.zcashaddress}
                        onCopyPress={async () => {
                          if (!userData.zcashaddress) {
                            return;
                          }
                          await copyTextToClipboard(`zcash:${userData.zcashaddress}?amount=${amount}&memo=${memo}`);
                          // setCopyIsClicked(true);
                          // setTimeout(() => { setCopyIsClicked(false); setCopyIsHovered(false); }, 200);
                        }}
                        onQrcodePress={() => {}}

                        // @ts-ignore
                        bg="#224259"// @ts-ignore
                        color="white"
                        borderRadius="2px"
                        onQrcodePress={() => {
                          setShowQrCode(true);
                          // setModalState('zecpages_qrcode');
                        }}
                        showQrCode={false}
                        // maxWidth={width * 0.35}
                        mt={3}
                        mb={12}
                      />
                    </ThemeProvider>
                  </Box>
                )}
                {[
                  { id: 'twitter', value: twitter },
                  { id: 'instagram', value: instagram },
                  { id: 'youtube', value: youtube },
                  { id: 'website', value: website },
                ].filter(({ value }) => value).map(({ id, value }) => (
                    <a key={id} href={makeLink(id, value)} target="_blank" rel="noopener">
                      <Box key={id} bg="white" borderRadius={12} mb={20} p={16}>
                        <Text center>
                          {id}
                        </Text>
                      </Box>
                    </a>
                  ))}
                  {userData?.zcashaddress && (
                    <Box>
                      <Button onPress={() => {
                        if (invoice_id) {
                          setInvoiceStage(InvoiceStage.INVOICE)
                        } else {
                          setInvoiceStage(InvoiceStage.CHOOSE_AMOUNT);
                        }
                      }}>DONATE WITH ZCASH</Button>
                    </Box>
                  )}
                  <Box>
                    <Link href="/">
                      <TextLink m={0} mb={20} color="blue">
                        {'< Back to home'}
                      </TextLink>
                    </Link>
                  </Box>
                {/* <Text center fontSize={20}>{userData.name}</Text> */}
              </Box>
            ) : (
              <Box>
                <Text>Profile Not Found</Text>
              </Box>
            )}
          </Box>
        </Section>
      </Box>
    </Layout>
  )
}
