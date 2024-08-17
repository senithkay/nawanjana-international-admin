'use client';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import H2 from "@/components/inhouse/h2";
import React from "react";
import {DefaultizedPieValueType} from "@mui/x-charts";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890, 2390, 3490, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800, 3800, 4300, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800, 3800, 4300, 4800, 3800, 4300];
const xLabels = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
];






const sizing = {

    width: 500,
    height: 300,
    legend: { hidden: false },
};



const Page =() => {
    const data = [
        { label: 'Remaining', value: 400, color: '#E7E7E7' },
        { label: 'Sold', value: 300, color: '#368AFF' },
    ];

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };
    return (
        <div className={'h-screen '}>
            <div className={'flex xl:flex-row flex-col'}>
                <div className={'flex flex-col gap-5 xl:w-[70%]'}>
                    <H2>Monthly Sales</H2>
                    <LineChart
                        height={500}
                        series={[
                            {data: pData, label: 'Mallawapitiya'},
                            {data: uData, label: 'Uyandana'},
                        ]}
                        xAxis={[{scaleType: 'point', data: xLabels}]}
                        grid={{vertical: true, horizontal: true}}
                    />
                </div>
                <div className={'flex flex-col npm xl:ml-auto mx-auto'}>
                    <H2>Monthly Sales</H2>
                    <PieChart
                        series={[
                            {
                                outerRadius: 150,
                                data,
                                arcLabel: getArcLabel,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14,
                            },
                        }}
                        {...sizing}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page;