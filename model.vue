<template>
 
    <div class="modal-backdrop">
     
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
          
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </header>
  
        <section class="modal-body">
          <slot name="body">
            <form ref="searchCountryForm" @submit.prevent="updateCountry">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              
              <div>
                <label class="text-gray-700" for="username">Country Name</label>
                <input v-model="modal_countryObj.countryname" placeholder="country name" name="countryname" id="countryname"
                 style=" border: 2px solid black; border-radius: 4px;" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                
                />
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress"
                  >Country Code</label
                >
                <input v-model="modal_countryObj.countrycode" placeholder="country code" name="countrycode" id="countrycode"
                style=" border: 2px solid black; border-radius: 4px;" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                  
                />
              </div>

              <div>
                <label class="text-gray-700" for="password">ISO Code</label>
                <input v-model="modal_countryObj.isocodes" placeholder="ISO code" name="isocodes" id="isocodes"
                style=" border: 2px solid black; border-radius: 4px;" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                  
                />
              </div>
              <input type="hidden" name="countrymasterid" v-model="modal_countryObj.countrymasterid">
              <input type="hidden" name="lastmodifiedby" v-model="modal_countryObj.lastmodifiedby">
              <div>
                <label class="text-gray-700" for="passwordConfirmation"
                  >Is Active</label
                >
                <select v-model="modal_countryObj.isactive" style=" border: 2px solid black; border-radius: 4px;" name="isactive" id="isactive" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" >
                  <option value="">Select </option>
                  <option value="1">Active</option>
                  <option value="0">Inactive </option>
                </select> 
                
              </div>

            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Update
              </button>
            </div>
          </form>
          </slot>
         </section>
  
        <footer class="modal-footer">
          <slot name="footer">
            
          </slot>
          <!-- <button
            type="button"
            class="btn-green"
            @click="close"
           
          >{{ countrymasterid }}
          
           Update
          </button> -->
        </footer>
      </div>
    </div>
  </template>


<script>
export default{
    name:'EditCountryModal',
    emits:['updateCountry'],
    updated(){

        console.log('In Child this.edit_countryObj=======>',this.edit_countryObj);

        this.modal_countryObj = JSON.parse(JSON.stringify(this.edit_countryObj));

        console.log('In Child  this.modal_countryObj=======>',this.modal_countryObj);
    },
    data(){
        return{
            modal_countryObj:{
                  countrymasterid:'',
                  countryname: '',
                  countrycode: '',
                  isocodes:'',
                  isactive:''
            }
        }
    },
    props:['countrymasterid','edit_countryObj'],
     
    methods:{
        close(){
            this.$emit('close');
        },
        updateCountry(){

            this.$emit('updateCountry',this.modal_countryObj);
             
        },
        
    },
    
}

 
</script>





<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>