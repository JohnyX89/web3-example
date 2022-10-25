import "./App.css";
import { ButtonBlue } from "./components/ButtonBlue";
import { Background } from "./components/Background";
import { Wrapper } from "./components/Wrapper";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import ContractInfo from "./components/ContractInfo/ContractInfo";

function App() {
  return (
    <Background>
      <Wrapper>
        <AccountInfo />
        <ContractInfo />
      </Wrapper>
    </Background>
  );
}

export default App;
