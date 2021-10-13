import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../../components/navbar/Navbar'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from "next";
import {ParsedUrlQuery} from "querystring";

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
  @media ${props => props.theme.media.phone} {
    margin-left: 15px
  }
`
const PostWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 480px;
  background: #FEFEFE;
  border-radius: 15px;
  margin-top: 50px;
  @media ${props => props.theme.media.widescreen} {
    width: 97.3%;
    margin-left: 20px;
  }
  @media ${props => props.theme.media.desktop} {
    width: 96.7%;
  }
  @media ${props => props.theme.media.laptop} {
    width: 96%;
    flex-direction: column;
  }
  @media ${props => props.theme.media.tablet} {
    align-items: center;
    width: 94.2%;
  }
  @media ${props => props.theme.media.phone} {
    width: 90.6%;
    padding-bottom: 80px;
    margin-left: 15px;
  }
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 49%;
  justify-content: center;
  padding: 0 25px 0 50px;
  @media ${props => props.theme.media.laptop} {
    width: 98%;
  }
  @media ${props => props.theme.media.tablet} {
    width: 98.5%;
    padding: 0 40px;
  }
  @media ${props => props.theme.media.phone} {
    width: 95%;
  }
`
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 51%;
  justify-content: center;
  padding: 0 50px 0 25px; 
  @media ${props => props.theme.media.laptop} {
    width: 98.4%;
    margin-left: 22px;
  }
  @media ${props => props.theme.media.phone} {
    width: 95%;
  }
`
const PostTitle = styled.h1`
  font-family: Roboto;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #3260A1;
  @media ${props => props.theme.media.tablet} {
    font-size: 22px;
  }
  @media ${props => props.theme.media.phone} {
    font-size: 20px;
  }
`
const PostText = styled.p`
  font-family: Roboto;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  @media ${props => props.theme.media.tablet} {
    font-size: 16px;
  }
  @media ${props => props.theme.media.phone} {
    font-size: 14px;
  }
`
const RemovePostButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -13px;
  left: 50%;
  transform: translateX(-50%);
  width: 139px;
  height: 25px;
  background: #EB5050;
  color: #FFFFFF;
  border-radius: 10px;
  font-family: Roboto;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  outline: none;
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
    padding: 10px 40px;
    width: 89px;
    height: 43px;
    bottom: 18px;
  }
`

const Post = ({ post }: any): JSX.Element => {

  const router = useRouter()
  const [remove, setRemove] = useState(false)

  useEffect(() => {
    if (remove) {
      axios.delete(`https://blog-app-server-2.herokuapp.com/api/1.0/posts/${post._id}`, { data: { id: post._id }})
      router.push('/')
    }
  }, [remove, post._id, router])

  const removePost = () => {
    setRemove(true)
  }

  return (
    <Wrapper>
      <Head>
        <title>
          NEXT BLOG | {post.title}
        </title>
      </Head>
      <Navbar />
      <Container>
        <Link href={'/'}
              passHref>
          <BackButton>
            <Image src={'/assets/icons/arrow.svg'}
                   alt={'arrow'}
                   width={24}
                   height={15}
            />
            Назад
          </BackButton>
        </Link>
        <PostWrapper>
          <TextWrapper>
            <PostTitle>
              {post.title}
            </PostTitle>
            <PostText>
              {post.text}
            </PostText>
          </TextWrapper>
          <ImageWrapper>
            <Image src={post.imageUrl}
                   alt={'imageUrl'}
                   width={540}
                   height={380}
            />
          </ImageWrapper>
          <RemovePostButton onClick={removePost}>
            Удалить статью
          </RemovePostButton>
        </PostWrapper>
      </Container>
    </Wrapper>
  )
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext<ParsedUrlQuery>): Promise<any> => {
  if (!params) {
    return {
      notFound: true
    }
  }

  try {
    const res = await axios.get(`https://blog-app-server-2.herokuapp.com/api/1.0/posts/${params.id}`)
    const post = await (res.data)

    if (!post) {
      return {
        notFound: true
      }
    }
    return {
      props: { post }
    }
  } catch (e) {
    console.error(e)
  }
}

export default Post