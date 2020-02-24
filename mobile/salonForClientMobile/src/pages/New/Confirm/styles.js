import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;

  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const Time = styled.Text`
  color: rgba(255, 255, 255, 0.6);
`;

export const Name = styled.Text`
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
`;