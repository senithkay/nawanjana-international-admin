import {Button} from "antd";

type ButtonProps = {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent) => void;
    className?: string;
}

const ButtonBP = ({children, onClick, className}: ButtonProps)=>{
    return ( <Button className={className} type="primary" onClick={onClick}>{children}</Button>);
}
export default ButtonBP;