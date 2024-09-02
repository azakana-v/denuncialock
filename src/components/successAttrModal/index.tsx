import * as Styles from './styles';
import X from '../../assets/icons/x.svg'
import checkMark from '../../assets/icons/check-mark 1.svg';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

function SuccessAttrModal({ onClose, isOpen }: DeleteModalProps){
    const navigate = useNavigate();
    return(
        <Styles.MainContainer>
        <Styles.Overlay onClick={() => navigate('/home')} />
        <Styles.ModalContainer>
          <Styles.CloseButton onClick={() => navigate('/home')} src={X} />
          <Styles.Title>Denúnca atribuida!</Styles.Title>
          <Styles.FakeBorder></Styles.FakeBorder>
            <img src={checkMark} alt="Um círculo com sinal de positivo." width={160} height={180} style={{ marginBottom: '2rem', marginTop: '2rem' }}/>
            <Styles.FakeBorder></Styles.FakeBorder>
          <Styles.Buttons>
            <Styles.ReturnBtn onClick={() => navigate('/home')}>
              OK!
            </Styles.ReturnBtn>
          </Styles.Buttons>
        </Styles.ModalContainer>
      </Styles.MainContainer>
    )
}

export default SuccessAttrModal;