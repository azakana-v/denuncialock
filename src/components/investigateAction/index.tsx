import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Styles from "./styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo2.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./scrollbar.css";
import User from "../../assets/icons/profile.svg"
import { IMember } from "../memberCard/IMember";
import Doc from "../../assets/icons/docs.svg"
import Alert from "../../assets/icons/alert.svg"


interface InvestigateActionProps {
  investigateActionTittle: string;
  investigateActionDate: string;
}

function InvestigateAction({investigateActionTittle, investigateActionDate}: InvestigateActionProps) {
 
  return (
        <Styles.InvestigateActionContainer>
          <Styles.ColumnOne>
              <Styles.Icon src={Doc}></Styles.Icon>
              <Styles.InfoContainer>
                <Styles.InvestigateActionTittle>{investigateActionTittle}</Styles.InvestigateActionTittle>
                <Styles.InvestigateActionDate>{investigateActionDate}</Styles.InvestigateActionDate>
              </Styles.InfoContainer>
          </Styles.ColumnOne>
            <Styles.VisualStatus src={Alert}></Styles.VisualStatus>
        </Styles.InvestigateActionContainer>
  );
}

export default InvestigateAction;
