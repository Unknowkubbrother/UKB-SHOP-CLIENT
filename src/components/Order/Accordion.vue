<template>
    <template v-for="(data, idx) in accordion_data" :key="idx"> 
        <div class="collapse collapse-arrow bg-base-200 my-2" @click="(checked != idx) ? (checked = idx) : (checked = null)">
            <input type="radio" name="my-accordion-2" :checked="idx === checked">
            <div class="collapse-title text-lg font-medium ">
                <div class="w-full flex justify-start items-center">
                    <span>Order #{{ idx + 1 }}</span>
                </div>
            </div>
            <div class="collapse-content text-sm">

                    <div class="w-full bg-[#353535] rounded-md flex justify-around gap-2 p-5 text-sm">
                <div class="flex flex-col justify-center items-center">
                    <span>Order Number </span>
                    <span>{{ data.transRefId }}</span>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <span>Date</span>
                    <span>{{ data.dateSlip }}</span>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <span>Total</span>
                    <span>{{ data.total }} Baht</span>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <span>Payment</span>
                    <span class="text-green-400 flex gap-2 justify-center items-center"><i
                        class="fa-solid fa-circle-check text-green-400"></i>success</span>
                </div>
                </div>

                <div class="w-full rounded-md p-5">
              <div class="text-lg my-5 font-semibold ">Order details</div>
              <div class="w-full">
                <div class="flex justify-between font-semibold mb-5">
                  <span>PRODUCT</span>
                  <span>Total</span>
                </div>
                <hr>
                <div class="flex flex-col gap-5 my-5">

                  <!--  -->
                  <div class="flex justify-between items-center" v-for="(order, index) in (data.data)" :key="index">
                    <div class="flex flex-col">
                      <span>{{ order.nameScript }}</span>
                      <span v-if="order.Plan.permanently.status">permanently</span>
                      <span v-else>rent : {{ order.Plan.rent.day }} day</span>
                    </div>
                    <span>{{ order.Plan.permanently.status ? order.Plan.permanently.price : order.Plan.rent.price }}
                      Baht</span>
                  </div>
                  <!--  -->

                </div>
                <hr>
                <div class="flex justify-between font-semibold mt-5">
                  <span>Total</span>
                  <span>{{ data.total }} Baht</span>
                </div>

              </div>
            </div>
            
            </div>
        </div>
    </template>
</template>

<script>
export default {
    name: "Accordion",
    props: {
        accordion_data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            checked: null
        }
    }

}
</script>

<style></style>