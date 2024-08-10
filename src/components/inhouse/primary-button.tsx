import {Button} from "antd";

type ButtonProps = {
    text: string;
    onClick: (event: React.MouseEvent) => void;
}

const ButtonBP = ({text, onClick}: ButtonProps)=>{
    return ( <Button type="primary" onClick={onClick}>{text}</Button>);
}
export default ButtonBP;