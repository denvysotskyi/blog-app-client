import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Image from 'next/image'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #EEF5FF;
`
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`
const BackButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 117px;
  height: 45px;
  border-radius: 10px;
  background: #FFF;
  color: #3260A1;
  margin-top: 30px;
  padding: 10px 15px 11px 22px;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(148, 174, 213, .8);
    transition: .3s all ease;
  }
  @media ${props => props.theme.media.widescreen} {
    margin-left: 20px
  }
`
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 119px;
  @media ${props => props.theme.media.tablet} {
    margin-top: 100px;
  }
  @media ${props => props.theme.media.phone} {
    margin-top: 81px;
  }
`
const Form = styled.form`
  max-width: 500px;  
  width: 100%;
  min-height: 447px;
  padding: 30px;
  background: #FFFFFF;
  border-radius: 15px;
  @media ${props => props.theme.media.tablet} {
    width: 400px;
  }
  @media ${props => props.theme.media.phone} {
    width: 300px;
  }
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
 `
const Input = styled.input`
  width: 100%;
  height: 33px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
`
const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  padding: 10px 0 0 10px;
  resize: none;
  outline: none;
`
const Label = styled.label`
  margin-bottom: 5px;
  font-family: Roboto;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #222222;
`
const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  width: 139px;
  height: 33px;
  background: #67BFFF;
  color: #FFF;
  padding: 8px 37px;
  border-radius: 10px;
  border: none;
  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(148, 174, 213, .8);
    transition: .3s all ease;
  }
  @media ${props => props.theme.media.tablet} {
    width: 109px;
    height: 38px;
  }
  @media ${props => props.theme.media.phone} {
    width: 89px;
    height: 43px;
  }
`
const Error = styled.div`
  color: red;
`

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Мало символов')
    .max(50, 'Много символов')
    .required('Обязательное поле'),
  text: Yup.string()
    .min(2, 'Мало символов')
    .max(5000, 'Много символов')
    .required('Обязательное поле'),
  imageUrl: Yup.string()
    .min(2, 'Мало символов')
    .max(500, 'Много символов')
    .required('Обязательное поле')
})

const AddPost = (): JSX.Element => {

  const router = useRouter()

  return (
    <Wrapper>
      <Head>
        <title>
          NEXT BLOG | Создать статью
        </title>
      </Head>
      <Navbar />
      <Container>
        <Link href={'/'}
              passHref>
          <BackButton>
            <Image src={'/assets/icons/left-arrow.svg'}
                   alt={'left_arrow'}
                   width={24}
                   height={15}
            />
            Назад
          </BackButton>
        </Link>
        <FormWrapper>
          <Formik
            initialValues={{
              title: '',
              text: '',
              imageUrl: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
              const url = 'https://blog-app-server-2.herokuapp.com/api/1.0/posts'
              await axios.post(url, values)
              setSubmitting(false)
              resetForm()
              router.push('/')
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
              <Form onSubmit={handleSubmit}>
                <InputWrapper>
                  <Label htmlFor={'title'}>
                    Название статьи:
                  </Label>
                  <Input type={'text'}
                         name={'title'}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.title}
                  />
                  {errors.title && touched.title ? (
                    <Error>
                      {errors.title}
                    </Error>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor={'text'}>
                    Текст статьи:
                  </Label>
                  <Textarea name={'text'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.text}
                  />
                  {errors.text && touched.text ? (
                    <Error>
                      {errors.text}
                    </Error>
                  ) : null}
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor={'imageUrl'}>
                    URL изображение:
                  </Label>
                  <Input type={'text'}
                         name={'imageUrl'}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         value={values.imageUrl}
                  />
                  {errors.imageUrl && touched.imageUrl ? (
                    <Error>
                      {errors.imageUrl}
                    </Error>
                  ) : null}
                </InputWrapper>
                <AddButton type={'submit'}
                           disabled={isSubmitting}>
                  Добавить
                </AddButton>
              </Form>
            )}
          </Formik>
        </FormWrapper>
      </Container>
    </Wrapper>
  )
}

export default AddPost