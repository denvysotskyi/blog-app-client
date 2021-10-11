import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/navbar/Navbar'
import Image from 'next/image'
import axios from 'axios'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #EEF5FF;
`
const Container = styled.div`
  position: relative;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`
const AddPostButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -62px;
  left: 50%;
  transform: translateX(-50%);
  width: 139px;
  height: 25px;
  background: #67BFFF;
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
`
const PostsWrapper = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 30px;
  row-gap: 50px;
  @media ${props => props.theme.media.widescreen} {
    padding: 0 35px 50px 35px;
  }
  @media ${props => props.theme.media.phone} {
    justify-content: center;
  }
`
const Post = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 260px;
  background: #FEFEFE;
  color: #3260A1;
  border-radius: 15px;
  font-family: Roboto;
  font-size: 18px;
  line-height: 21px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: .3s all ease;
  }
  @media ${props => props.theme.media.phone} {
    width: 320px;
  }
`

interface IPostImage{
  image: string
}
const PostImage = styled.div<IPostImage>`
  width: 340px;
  height: 260px;
  background: url('${({image}) => image}') center / cover no-repeat;
  border-radius: 15px 15px 0 0;
  @media ${props => props.theme.media.phone} {
    width: 320px;
  }
`
const PostTitle = styled.div`
height: 50px;
background: #FEFEFE;
padding: 15px 20px;
  @media ${props => props.theme.media.phone} {
    font-size: 15px;
  }
`

interface IHomeProps {
  _id: string
  title: string
  text: string
  imageUrl: string
}

const Home = ({ data }: any): JSX.Element => (
    <Wrapper>
      <Head>
        <title>
          NEXT BLOG | Статьи
        </title>
      </Head>
      <Navbar />
      <Container>
        <Link href={'/add-post'}
              passHref>
          <AddPostButton>
            Добавить статью
          </AddPostButton>
        </Link>
        <PostsWrapper>
          {
            data.map((post: IHomeProps, index: number) => <Link href={'/post/[id]'}
                                            as={`/post/${post._id}`}
                                            key={index}
                                            passHref>
                                             <Post>
                                               <PostImage image={post.imageUrl}/>
                                               <PostTitle>
                                                 {post.title}
                                               </PostTitle>
                                             </Post>
                                     </Link>
            )
          }
        </PostsWrapper>
      </Container>
    </Wrapper>
  )

export const getServerSideProps = async () => {

  try {
    const res = await axios.get(`https://blog-app-server-2.herokuapp.com/api/1.0/posts`)
    const data = await(res.data)

    if (!data) {
      return {
        notFound: true
      }
    }
    return {
      props: { data }
    }
  } catch (e) {
    console.error(e)
  }
}

export default Home