import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContainerBordinha = styled.div``;
const Filtro = styled.p`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  border-right: 2px solid white;
  &:last-child {
    border-right: none;
  }
`;
const ContentBordinha = styled.div`
  margin: 1.5rem 0;
  padding: 1rem 0;
  background: #8004cd;
  color: white;
  font-weight: 600;
  width: 1000px;
  height: 60px;
  border-radius: 15px;
  display: grid;
  cursor: pointer;
  grid-template-columns: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
  &:first-child {
    cursor: auto;
    background-color: #190841;
  }
`;

function Bordinha({
  data,
  titulo,
  tipo,
  gravidade,
  responsavel,
  status,
  id,
}: any) {
  const navigate = useNavigate();
  return (
    <ContentBordinha
      onClick={() => {
        if (id) {
          navigate(`/home/report/${id}`);
        }
      }}
    >
      <Filtro>{data}</Filtro>
      <Filtro>{titulo}</Filtro>
      <Filtro>{tipo}</Filtro>
      <Filtro>{gravidade}</Filtro>
      <Filtro>{responsavel}</Filtro>
      <Filtro>{status}</Filtro>
    </ContentBordinha>
  );
}

export default Bordinha;
