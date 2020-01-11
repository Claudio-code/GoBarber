import styled from 'styled-components';

export const Container = styled.div`
  background: #616161;
  padding: 0 30px;

`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  img {
    height: 32px;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }

  a {
    color: #eee;
    font-weight: bold;
  }
`;

export const Aside = styled.aside`
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #e0e0e0;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #fff;
    }
  }

  img {
    height: 32px;
    border-radius: 50%;
  }
`;