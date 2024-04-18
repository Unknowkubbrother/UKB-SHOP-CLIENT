<template>
  <div id="cart">
    <div class="lg:w-[60%] min-[430px]:w-[80%] h-full m-auto mb-10">
      <div class="w-full h-[130px] flex justify-between items-center">
        <ul class="steps w-full">
          <li data-content="1" :class="{
            'step': step < 1,
            'step step-primary': step >= 1,
          }">YOUR CART</li>
          <li data-content="2" :class="{
            'step': step < 2,
            'step step-primary': step >= 2,
          }">CHECKOUT</li>
          <li data-content="3" :class="{
            'step': step < 3,
            'step step-primary': step >= 3,
          }">PREVIEW ORDER</li>
        </ul>
      </div>

      <!--  -->
      <div class="w-full" v-if="step == 1">
        <div class="step-one w-full p-4 bg-base-100 rounded-xl shadow-lg shadow-black z-50">

          <div v-if="store.length !== 0">
            <div class="Item flex flex-col gap-2 h-[400px] overflow-auto">
              <!--  -->
              <div class="flex justify-between items-center" v-for="(data, idx) in store" :key="idx">
                <div class="flex flex-col">
                  <span>{{ data.nameScript }}</span>
                  <span class="text-[#555555]" v-if="data.Plan.permanently.status">permanently</span>
                  <div class="flex gap-2 justify-center items-center text-sm" v-else>
                    <span class="text-[#555555]">rent : </span>
                    <input type="number" id="day" name="day" min="1" v-model="data.Plan.rent.day"
                      class="w-[60px] h-[5px] p-2 text-white bg-transparent rounded-[5px] text-center"><span
                      class="text-[#555555]">day</span>
                  </div>
                </div>
                <div class="flex gap-2 justify-center items-center">
                  <span v-if="data.Plan.permanently.status">{{ data.Plan.permanently.price }} Baht</span>
                  <span v-else>{{ data.Plan.rent.price }} Baht</span>
                  <i @click="delete_a_Store(data)"
                    class="fa-solid fa-xmark text-sm text-[#707070] cursor-pointer hover:text-rose-700 duration-300"></i>
                </div>
              </div>
              <!--  -->
            </div>
            <div class="flex justify-between items- mt-4 font-semibold">
              <span>Total</span>
              <span>{{ total }} Baht</span>
            </div>
          </div>
          
          <div v-else class="w-full p-10 flex justify-center items-center flex-col gap-4">
            <i class="fa-solid fa-cart-shopping text-[5rem] text-[#5c5c5c]"></i>
            <span>Your cart is empty.</span>
            <router-link to="/store" class="btn btn-primary text-white">Go to Store</router-link>
          </div>

        </div>
        <div 
        :class="(store.length !== 0) ? 'justify-between items-center' : 'justify-end items-center mt-2'"
        class="w-full flex">
          <div class="coupon w-[90%] ml-5 mt-2" v-if="store.length !== 0">
            <div class="w-[40%] h-[60px] bg-[#262626] flex justify-center items-center gap-3 rounded-lg p-4 z-40" >
              <input type="text" placeholder="Coupon code" v-model="coupon"
                class="w-[70%] h-[30px] rounded-lg border-2 border-[#353535] p-2 bg-transparent focus:outline-none focus:ring-0">
              <button @click="CheckCoupon" class="w-[30%] h-[30px] rounded-lg bg-[#3d7fa1] text-white text-xs">Apply
                Coupon</button>
            </div>
          </div>
          <button @click="steptwo()" class="btn btn-primary text-white">Next <i
              class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>

      <!--  -->

      <!--  -->
      <div class="w-full" v-if="step == 2">
        <div class="w-full h-[500px] rounded-lg flex justify-start items-center overflow-hidden gap-3">
          <div class="w-[50%] h-full flex flex-col gap-3">
            <div class="list-store w-full h-[60%] bg-base-100 rounded-lg p-3 text-sm">

              <div class="w-full h-[85%] mb-3 flex flex-col gap-1 overflow-auto">
                <!--  -->
                <div class="flex justify-between" v-for="(data, idx) in store" :key="idx">
                  <div class="flex flex-col">
                    <span>{{ data.nameScript }}</span>
                    <span class="text-[#555555] text-sm" v-if="data.Plan.permanently.status">permanently</span>
                    <span class="text-[#555555] text-sm" v-else>rent: {{ data.Plan.rent.day }} day</span>
                  </div>
                  <span v-if="data.Plan.permanently.status">{{ data.Plan.permanently.price }} Baht</span>
                  <span v-else>{{ data.Plan.rent.price }} Baht</span>
                </div>
                <!--  -->

              </div>

              <div class="total">
                <div class="flex justify-between">
                  <span class="font-semibold">Total</span>
                  <span class="font-semibold">{{ total }} Baht</span>
                </div>
              </div>

            </div>

            <div class="payment w-full h-[40%] bg-base-100 rounded-lg p-3 text-sm flex">
              <div class="qrcode w-[32%] h-full flex justify-center items-center rounded-lg overflow-hidden">
                <div v-html="Qrcodepayment" class="w-full h-full m-auto"></div>
              </div>
              <div class="w-[15%] h-full flex justify-between items-center flex-col">
                <div class="w-[2px] h-[40%] bg-white"></div>
                <div class="w-full h-[20%] flex justify-center items-center"><span>OR</span></div>
                <div class="w-[2px] h-[40%] bg-white"></div>
              </div>
              <div class="w-[53%] h-full">
                <div class="w-full h-[80%] flex flex-col gap-2">
                  <div class="flex gap-2">
                    <img src="../../assets/scb-logo.jpg" alt="scb-logo" class="w-5 h-5 rounded-sm overflow-hidden">
                    Nutchanon Sapmeechai
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[#555555] text-xs">Account Name</span>
                    <span>นายณัฐชานน ทรัพย์มีชัย</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[#555555] text-xs">Account No.</span>
                    <span>438-073756-7</span>
                  </div>
                </div>
                <div class="w-full h-[20%] flex justify-between items-center">
                  <span class="font-semibold">Total</span>
                  <span class="font-semibold">{{ total }} Baht</span>
                </div>
              </div>

            </div>

          </div>
          <div class="slip w-[50%] h-full bg-base-100 rounded-lg flex flex-col justify-start items-center p-3">
            <div
              class="w-full h-[85%] border-dashed border-2 border-[#464646] rounded-lg flex justify-center items-center p-5">
              <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }"
                @click="selectImage"></div>
            </div>
            <div class="w-full h-[15%] flex justify-center items-center">
              <label class="fileslip w-full h-[70%] flex justify-center items-center">
                <input ref="fileInput" type="file" @input="pickFile" required>
                <span><i class="fa-solid fa-cloud-arrow-up mr-2"></i>Upload Receipt</span>
              </label>
            </div>
          </div>

        </div>
        <div class="flex justify-between items-center mt-5">
          <button @click="step = 1" class="btn text-white"><i class="fa-solid fa-arrow-left"></i> Back</button>
          <button @click="Checkout()" class="btn btn-primary text-white">Checkout</button>
        </div>
      </div>

      <!--  -->

      <div class="w-full" v-if="step == 3">
        <div class="w-full bg-base-100 rounded-lg">
          <div class="w-full h-full m-auto p-10">

            <div class="mt-5 mb-10 flex justify-center items-center text-2xl font-bold"><span>Thank you for your
                order</span></div>

            <div class="w-full bg-[#353535] rounded-lg flex justify-around gap-2 p-5 text-lg ">
              <div class="flex flex-col justify-center items-center">
                <span>Order Number </span>
                <span>{{ orderpreview.transRefId }}</span>
              </div>
              <div class="flex flex-col justify-center items-center">
                <span>Date</span>
                <span>{{ orderpreview.dateSlip }}</span>
              </div>
              <div class="flex flex-col justify-center items-center">
                <span>Total</span>
                <span>{{ orderpreview.total }} Baht</span>
              </div>
              <div class="flex flex-col justify-center items-center">
                <span>Payment</span>
                <span class="text-green-400 flex gap-2 justify-center items-center"><i
                    class="fa-solid fa-circle-check text-green-400"></i>success</span>
              </div>
            </div>

            <div class="w-full rounded-lg p-5">
              <div class="text-xl my-10 font-semibold ">Order details</div>
              <div class="w-full">
                <div class="flex justify-between font-semibold mb-5">
                  <span>PRODUCT</span>
                  <span>Total</span>
                </div>
                <hr>
                <div class="flex flex-col gap-5 my-5">

                  <!--  -->
                  <div class="flex justify-between items-center" v-for="(data, idx) in orderpreview.data" :key="idx">
                    <div class="flex flex-col">
                      <span>{{ data.nameScript }}</span>
                      <span v-if="data.Plan.permanently.status">permanently</span>
                      <span v-else>rent : {{ data.Plan.rent.day }} day</span>
                    </div>
                    <span>{{ data.Plan.permanently.status ? data.Plan.permanently.price : data.Plan.rent.price }}
                      Baht</span>
                  </div>
                  <!--  -->

                </div>
                <hr>
                <div class="flex justify-between font-semibold mt-5">
                  <span>Total</span>
                  <span>{{ orderpreview.total }} Baht</span>
                </div>

              </div>
            </div>
            <div class="w-full mt-10 bg-[#353535] rounded-lg p-10">
              <div class="flex justify-start items-start gap-3">
                <i class="fa-solid fa-circle-exclamation text-orange-400 text-2xl"></i>
                <div>
                  <span class="text-lg font-semibold mb-2">โปรดอ่าน!!</span>
                  <p>หากคุณได้ซื้อสคริปเสร็จแล้วคุณต้องตั้ง IP ก่อนถึงจะใช้งานสคริปนั้นได้ คุณสามารถตั้ง IP
                    สคริปของคุณได้ที่ <router-link to="/Dashboard" class="text-green-400">Dashboard</router-link>
                    <br>
                    <span class="text-rose-400">คำเตือน !! ถ้าหากคุณได้ซื้อสคริปเป็นสคริปเช่าคุณต้องตั้ง IP
                      และใช้งานสคริป
                      ภายในวันที่ซื้อสคริปและสคริปจะสิ้นสุดวันที่คุณซื้อไว้ว่ากี่วันหลังจากวันซื้อสคริป</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="flex justify-end items-center mt-5">
          <button class="btn btn-primary text-white" @click="$router.push('/home')">Done</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import { config } from "../../config";
import axios from "axios";
export default {
  name: "Cart",
  data() {
    return {
      step: 1,
      store: [],
      total: 0,
      coupon: null,
      previewImage: null,
      Qrcodepayment: null,
      orderpreview: []
    };
  },
  methods: {
    getStore() {
      this.store = JSON.parse(localStorage.getItem('cart')) || [];
      this.store.map((data) => {
        if (data.Plan.rent.status) {
          data.Plan.rent.price = data.Plan.rent.Unitprice * data.Plan.rent.day;
          this.$watch(() => data.Plan.rent.day, (newVal) => {
            data.Plan.rent.price = data.Plan.rent.Unitprice * newVal;
            this.TotalCart();
            localStorage.setItem('cart', JSON.stringify(this.store));
          });
        }
      })
    },
    TotalCart() {
      this.total = 0; // Reset total before calculating
      this.store.map((data) => {
        if (data.Plan.permanently.status) {
          this.total += data.Plan.permanently.price;
        } else {
          this.total += data.Plan.rent.price;
        }
      });
    },
    delete_a_Store(data) {
      this.store = this.store.filter((item) => item !== data);
      localStorage.setItem('cart', JSON.stringify(this.store));
      this.TotalCart();
    },
    CheckCoupon() {
      // if(this.coupon == 'UKB'){
      //   this.total = this.total - (this.total * 0.1);
      // }
      if (this.coupon != null) {
        toast("ระบบกำลังปิดอัพเดต", {
          "theme": "dark",
          "type": "info",
          "pauseOnHover": false,
          "dangerouslyHTMLString": true
        })
      } else {
        toast("กรุณาใส่ Coupon Code", {
          "theme": "dark",
          "type": "error",
          "pauseOnHover": false,
          "dangerouslyHTMLString": true
        })

      }

    },
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files[0]
      if (file) {
        let allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
        if (!allowedExtensions.exec(file.name)) {
          toast("โปรดอัปโหลดไฟล์ที่มีนามสกุลที่ถูกต้อง (png, jpg, jpeg)", {
            "theme": "dark",
            "type": "error",
            "pauseOnHover": false,
            "dangerouslyHTMLString": true
          })
          return;
        }
        let reader = new FileReader()
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file)
        this.$emit('input', file)
      }
    },
    generatorQr() {
      const api = `${config.EndPoint}/payment/generator`;
      axios.post(api, {
        mobileNumber: '0902974175',
        amount: this.total
      }, { withCredentials: true }).then((res) => {
        if (res.status === 200) {
          this.Qrcodepayment = res.data;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    steptwo() {
      if (this.store.length !== 0) {
        this.step = 2;
      } else {
        toast("ไม่พบทรัพยากรในตะกร้าสินค้าของคุณ", {
          "theme": "dark",
          "type": "warning",
          "pauseOnHover": false,
          "dangerouslyHTMLString": true
        })
      }


    },
    async Checkout() {
      if (this.$refs.fileInput.files.length == 0) {
        toast("โปรดอัปโหลดสลิปการโอนเงิน", {
          "theme": "dark",
          "type": "error",
          "pauseOnHover": false,
          "dangerouslyHTMLString": true
        })
        return;
      }
      let formData = new FormData();
      formData.append('paymentSlip', this.$refs.fileInput.files[0]);
      formData.append('storeData', JSON.stringify(this.store));
      formData.append('total', this.total);

      const api = `${config.EndPoint}/payment/checkout`;
      axios.post(api, formData, { withCredentials: true }).then((res) => {
        if (res.status === 201) {
          toast("ชำระเงินสำเร็จ!!", {
            "theme": "dark",
            "type": "success",
            "pauseOnHover": false,
            "dangerouslyHTMLString": true
          })
          localStorage.removeItem('cart');
          this.orderpreview = res.data;
          this.step = 3;
        }
      }).catch((err) => {
        console.log(err);
        toast(err.response.data, {
          "theme": "dark",
          "type": "error",
          "pauseOnHover": false,
          "dangerouslyHTMLString": true
        })
      });
    }

  },
  watch: {
    step(newVal) {
      if (newVal == 2) {
        this.generatorQr();
      }
    }
  },
  async mounted() {
    await this.getStore();
    this.TotalCart();
  }
};
</script>

<style>
.imagePreviewWrapper {
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  background-size: contain;
  background-position: center center;
}

label.fileslip input[type="file"] {
  position: absolute;
  top: -1000px;
}

.fileslip {
  cursor: pointer;
  border-radius: 15px;
  padding: 5px 15px;
  margin: 5px;
  background: #3d7fa1;
  display: inline-block;
  transition-duration: 300ms;
}

.fileslip:hover {
  background: #1c526d;
}

.fileslip:active {
  background: #1c526d;
}


.fileslip:valid+span {
  color: #ffffff;
}
</style>