import styled from 'styled-components'
import Link from 'next/link'

const Nav = styled.nav`
  padding: 17px 0;
  background: #FEFEFE;
`
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`
const NavbarItem = styled.div`
  position: relative;
`
const Logo = styled.a`
  color: #3260A1;
  font-family: Roboto;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  &:hover {
    cursor: pointer;
  }
  @media ${props => props.theme.media.widescreen} {
    margin-left: 20px
  }
  @media ${props => props.theme.media.phone} {
    margin-left: 15px
  }
`

const Navbar = (): JSX.Element => (
    <Nav>
      <Container>
        <NavbarItem>
          <Link href={'/'}
                passHref>
            <Logo>
              NEXT | BLOG
            </Logo>
          </Link>
        </NavbarItem>
      </Container>
    </Nav>
  )

export default Navbar