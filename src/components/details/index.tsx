import * as Styles from "./styles";
import Logo from "../../assets/Logo2.svg";
import Trash from '../../assets/icons/trash.svg'

function Details() {
  return (
    <Styles.DetailsContainer>
      <Styles.DetailsTitle>
        <Styles.DetailsLogo src={Logo} />
        <Styles.Title>
          Título <br /> Denúncia
        </Styles.Title>
      </Styles.DetailsTitle>
      <Styles.Details>
        <Styles.Row>
          <Styles.Date>Data: 20/02/2024</Styles.Date>
          <Styles.Status>
            <Styles.StatusCircle></Styles.StatusCircle>
            <Styles.StatusText>Em andamento</Styles.StatusText>
          </Styles.Status>
        </Styles.Row>
        <Styles.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          excepturi ea iure odit quaerat iusto aut facilis, soluta quisquam.
        </Styles.Text>
        <Styles.Evidence>
            <Styles.EvidenceTitle>Evidências</Styles.EvidenceTitle>
            <Styles.Slots>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            <Styles.Slot></Styles.Slot>
            </Styles.Slots>
        </Styles.Evidence>
        <Styles.Delete>
            <Styles.DeleteButton>
                <Styles.Icon src={Trash}/>
                <Styles.BtnTitle>Deletar</Styles.BtnTitle>
            </Styles.DeleteButton>
        </Styles.Delete>
      </Styles.Details>
    </Styles.DetailsContainer>
  );
}

export default Details;
