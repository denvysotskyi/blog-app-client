import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import Link from 'next/link'
import Image from 'next/image'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
  margin: 30px 0 40px 0;
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
const Title = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: red;
  text-transform: uppercase;
  @media ${props => props.theme.media.phone} {
    font-size: 26px;
  }
`
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${props => props.theme.media.phone} {
    width: 90%;
    height: 90%;
    margin-left: 18px;
  }
`

const PageNotFound = (): JSX.Element => (
  <Wrapper>
    <Head>
      <title>
        NEXT BLOG | 404
      </title>
    </Head>
    <Navbar />
    <Container>
      <Title>
        Страница не найдена
      </Title>
      <Link href={'/'}
            passHref>
        <BackButton>
          <Image src={'/assets/icons/left-arrow.svg'}
                 alt={'left-arrow'}
                 width={24}
                 height={15}
          />
          Назад
        </BackButton>
      </Link>
      <ImageWrapper>
        <Image src={'/assets/icons/404.png'}
               alt={'404_image'}
               width={390}
               height={290}
        />
      </ImageWrapper>
    </Container>
  </Wrapper>
)

export default PageNotFound