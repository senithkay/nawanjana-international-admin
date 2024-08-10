'use client'
import H2 from "@/components/inhouse/h2";
import {Table, TableColumnsType, TableProps} from "antd";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DatePicker } from 'antd';
import ButtonBP from "@/components/inhouse/primary-button";

const { RangePicker } = DatePicker;

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.ReactNode;
    no: string;
    description: string;
    qty: number;
    unitPrice:number;
    totalAmount:number;
    actions: React.ReactNode;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        width: '12%',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',

    },
    {
        title: 'Qty',
        dataIndex: 'qty',
        width: '12%',
        key: 'qty',
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
        width: '12%',
        key: 'unitPrice',
    },
    {
        title: 'Total Amount',
        dataIndex: 'totalAmount',
        width: '12%',
        key: 'totalAmount',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        width: '12%',
        key: 'actions',
    },
];

const Actions = ({id}:{id:string}) => {
    return (<>
        <EditIcon key={id+"edit"} sx={{color:'#1677FF'}}/>
        <DeleteOutlineIcon key={id+"delete"} sx={{color:'#FF0000'}}/>
    </>);
}

const data: DataType[] = [
    {
        key: 1,
        no: "11221342",
        description: "Used Komatsu Excavator 1",
        qty: 100,
        unitPrice: 400,
        totalAmount: 100000,
        actions: <Actions id={"11221342"}/>
    },
    {
        key: 2,
        no: "11221344",
        description: "Used Komatsu Excavator 2",
        qty: 100,
        unitPrice:400,
        totalAmount:100000,
        actions: <Actions id={"11221344"}/>
    },
    {
        key: 2,
        no: "11221345",
        description: "Used Komatsu Excavator 2",
        qty: 100,
        unitPrice:400,
        totalAmount:100000,
        actions: <Actions id={"11221344"}/>
    },
    {
        key: 2,
        no: "11221346",
        description: "Used Komatsu Excavator 2",
        qty: 100,
        unitPrice:400,
        totalAmount:100000,
        actions: <Actions id={"11221344"}/>
    },
    {
        key: 2,
        no: "11221347",
        description: "Used Komatsu Excavator 2",
        qty: 100,
        unitPrice:400,
        totalAmount:100000,
        actions: <Actions id={"11221344"}/>
    },{
        key: 2,
        no: "11221348",
        description: "Used Komatsu Excavator 2",
        qty: 100,
        unitPrice:400,
        totalAmount:100000,
        actions: <Actions id={"11221344"}/>
    },


];

const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};


const Page = () =>{
    return (
        <div className={'flex flex-col gap-6'}>
            <H2>Stock Details</H2>
           <div className={'w-full flex justify-end'}>
               <ButtonBP text={'Add New'} onClick={(event)=>{}}/>
           </div>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}



export default Page;