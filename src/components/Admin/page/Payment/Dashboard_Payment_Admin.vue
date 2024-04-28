<template>
    <div class="w-full h-full my-5">
        <div class="w-full 2xl:w-[90%] bg-base-100 m-auto rounded-lg p-5">
            <div class="flex justify-between items-center border-b-2 border-b-[#505050] pb-3 ">
                <span>ข้อมูลการชำระเงิน</span>
                <input type="month" class="bg-base-200 text-base-content border-none rounded-lg" v-model="seletedMonth">
            </div>
            <div class="flex justify-center"></div>
            <div id="chart" class="mt-5">
                <apexchart :height="height" :options="chartOptions" :series="series"></apexchart>
            </div>
            <div class="w-full flex justify-start items-center">
                รายได้รวมเดือนนี้ : {{ series[0].data.reduce((acc, item) => acc + item, 0) }} บาท
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { config } from '../../../../config';
export default {
    name: "Dashboard_Payment_Admin",
    data() {
        return {
            height: 550,
            seletedMonth: new Date().toISOString().slice(0, 7),
            series: [{
                name: "ยอดการชำระเงิน",
                data: []
            }],
            chartOptions: {
                chart: {
                    type: 'area',
                    stacked: true,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom',
                        tools:{
                            download: false
                        }
                    }
                },
                plotOptions: {
                    line: {
                        curve: 'smooth'
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'ยอดการชำระเงินรายวัน',
                    align: 'left',
                    style: {
                        color: '#ffffff' // Modify the text color here
                    }
                },
                noData: {
                    text: 'Loading...'
                },
                grid: {
                    row: {
                        colors: ['#262626', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                    labels: {
                        style: {
                            colors: '#ffffff' // Modify the label text color here
                        },
                        rotateAlways: false,
                        rotate: 0
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#ffffff' // Modify the Y-axis label text color here
                        },
                        rotateAlways: true,
                        rotate: -45
                    }
                },
                tooltip: {
                    theme: 'dark',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    }
                },
                resonsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            yaxis: {
                                labels: {
                                    rotate: -90
                                }
                            }
                        }
                    }]
                }
            },
        }
    },
    methods: {
        async getPayment() {
            const api = `${config.EndPoint}/payment`;
            await axios.get(api, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                const data = res.data.filter((item) => {
                const createdAt = new Date(item.createdAt);
                const thaiTime = new Date(createdAt.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
                return thaiTime.toISOString().slice(0, 7) === this.seletedMonth;
                });
                const series = data.reduce((acc, item) => {
                const createdAt = new Date(item.createdAt);
                const thaiTime = new Date(createdAt.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
                acc[thaiTime.getDate() - 1] += item.total;
                return acc;
                }, Array.from({ length: 31 }, () => 0));
                this.series = [{
                name: "ยอดการชำระเงิน",
                data: series
                }];
                this.chartOptions.xaxis.categories = Array.from({ length: 31 }, (_, i) => i + 1);
                // Swap x-axis and y-axis for mobile responsive
                if (window.innerWidth <= 768) {
                this.chartOptions.xaxis.labels.rotateAlways = true;
                this.chartOptions.xaxis.labels.rotate = -45;
                this.chartOptions.yaxis.labels.rotateAlways = false;
                this.chartOptions.yaxis.labels.rotate = 0;
                } else {
                this.chartOptions.xaxis.labels.rotateAlways = false;
                this.chartOptions.xaxis.labels.rotate = 0;
                this.chartOptions.yaxis.labels.rotateAlways = true;
                this.chartOptions.yaxis.labels.rotate = -45;
                }
            }
            }).catch((err) => {
            console.log(err);
            });
        }
    },
    watch: {
        seletedMonth() {
            this.getPayment();
        }
    },
    mounted() {
        this.getPayment();
    }

}
</script>

<style></style>