'use client'
import H2 from "@/components/inhouse/h2";
import {Table, TableColumnsType, TableProps} from "antd";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.ReactNode;
    invoiceNo: string;
    age: number;
    address: string;
    children?: DataType[];
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Invoice No.',
        dataIndex: 'invoiceNo',
        key: 'invoiceNo',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
    },
];

const data: DataType[] = [
    {
        key: 1,
        invoiceNo: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                invoiceNo: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            },
            {
                key: 12,
                invoiceNo: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                    {
                        key: 121,
                        invoiceNo: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                    },
                ],
            },
            {
                key: 13,
                invoiceNo: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                    {
                        key: 131,
                        invoiceNo: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                            {
                                key: 1311,
                                invoiceNo: 'Jim Green jr.',
                                age: 25,
                                address: 'London No. 3 Lake Park',
                            },
                            {
                                key: 1312,
                                invoiceNo: 'Jimmy Green sr.',
                                age: 18,
                                address: 'London No. 4 Lake Park',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        invoiceNo: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
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
        <div>
            <H2>Shipment Details</H2>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}

export default Page;