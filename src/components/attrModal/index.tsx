import * as Styles from './styles';
import trash from '../../assets/icons/delete.svg';
import returnIcon from '../../assets/icons/back.svg';
import trashBtn from '../../assets/icons/trash.svg';
import X from '../../assets/icons/x.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './scrollbar.css';
import MemberCard from '../memberCard';
import { useState } from 'react';

let membrosXumbados = [{
    member: {
      nome: "João Silva",
      reports: 5,
      profile: "https://i.pinimg.com/originals/24/16/a5/2416a57ec634dfebcfcc3cf6fad1bc7d.jpg",
    }
  },
  {
    member: {
      nome: "Cleber Costa",
      reports: 1,
      profile: "https://odia.ig.com.br/_midias/jpg/2022/01/25/rodrigo_2-24122582.jpeg",
    },
  },
  {
    member: {
      nome: "Antonio Fagundes",
      reports: 0,
      profile: "https://media.licdn.com/dms/image/C4E03AQGF5aKSpEsuzw/profile-displayphoto-shrink_800_800/0/1626398366369?e=2147483647&v=beta&t=GHvlAlFGOa---kpeLJ5tja2HrLXTclqOiF_PBrtrLcA",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  },
  {
    member: {
      nome: "Rosana Meire",
      reports: 5,
      profile: "https://th.bing.com/th/id/OIP.nPzEKJFfbv8fL_7pYv89oQAAAA?rs=1&pid=ImgDetMain",
    },
  }
  ]

interface DeleteModalProps{
    isOpen: boolean,
    onClose: () => void,
    onConfirm: (reportId: string) => void,
    reportId: string
}

function AttrModal({ isOpen, onClose, onConfirm, reportId  }: DeleteModalProps) {
    const [selected, setSelected] = useState<number>()

    if (!isOpen) return null;

    const handleConfirm = () => {
        console.log('Report ID no Modal:', reportId);  // Deve mostrar o ID correto aqui
        onConfirm(reportId);  // Passa o reportId para a função de confirmação
    };

    return (
        <Styles.MainContainer>
        <Styles.Overlay onClick={onClose} />
        <Styles.ModalContainer>
            <Styles.CloseButton onClick={onClose} src={X}/>
            <Styles.Title>Membros</Styles.Title>
            <Styles.FakeBorder></Styles.FakeBorder>

            <PerfectScrollbar style={{ maxHeight: '38rem', overflow: 'auto' }}>
            {membrosXumbados.map((member, index) => (

                <div style={{margin: "0 1.8rem"}} onClick={()=>{setSelected(index); console.log(index);
                }}>
                    <MemberCard selected={selected === index}  member={member.member} key={index} />
                </div>
              ))}
            </PerfectScrollbar>

            <Styles.Buttons>
            <Styles.ReturnBtn onClick={onClose}>
                + | Atribuir
            </Styles.ReturnBtn>

          
            </Styles.Buttons>
        </Styles.ModalContainer>
    </Styles.MainContainer>
    );
}

export default AttrModal;
