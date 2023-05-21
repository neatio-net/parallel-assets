<template>
  <div class="main">
<div class="cmm">Coming soon...</div>
  </div>
</template>

<script>
import Access from "./modules/access";
import EyeInput from "./modules/eyeInput";
import neatioapi from "neatioapi";
import axios from "axios";
import { watch } from "vue";
const Utils = neatioapi.utils;
const Web3 = require("web3");
const web3 = new Web3("https://bsc-dataseed.binance.org/");
export default {
  data() {
    return {
      step: 2,
      balance: "",
      fullbalance: "",
      address: null,
      addresss: null,
      shortAddress: null,
      privateKey: "",
      currentChainId: "",
      chainID: "0x38",
      staking: "",
      rewards: "",
      amount: "",
      limit: "",
      price: "",
      inStake: "",
      circulating: "",
      validators: null,
      aprPercent: "",
      amountToBuy: null,
      amountBNB: "",
      bnbprice: "",
      totalUSD: "",
      totalBNB: "",
    };
  },
  components: {
    Access,
    EyeInput,
  },
  mounted() {
    this.connectAccount();
    this.initialize();
    this.bnbrate();
    this.checkWallet();
  },
  methods: {
    initialize() {
      ethereum.on("chainChanged", (_chainId) => {
        this.getGasPrice();
        this.getBalance();
      });
      ethereum.on("accountsChanged", (_accounts) => {
        this.address = _accounts[0];
        this.getBalance();
      });
    },
    checkWallet() {
      if (this.walletNF == null) {
        console.log("not found");
      } else {
        console.log("wallet found");
      }
    },
    strTrim(str) {
      str = str + "";
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    highlight(index) {
      this.curNav = index;
    },
    getLocaction() {
      this.isTestNetwork =
        window.location.hostname.substr(0, 4) === "test" ||
        window.location.hostname.substr(0, 4) === "loca";
    },
    async initialize() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      ethereum.on("chainChanged", (_chainId) => {
        this.connectAccount(_chainId);
      });
      ethereum.on("accountsChanged", (_accounts) => {
        this.requestAccount();
      });
      this.requestAccount();
    },
    refresher() {
      // WIP Code
    },
    async requestAccount() {
      this.currentChainId = await ethereum.request({ method: "eth_chainId" });
      try {
        if (this.currentChainId !== this.chainId) {
          this.connectAccount();
        } else {
          this.addresss = `BSC Network`;
          this.shortAddress = `${accounts[0].substr(
            0,
            6
          )}...${accounts[0].slice(-4)}`;
        }
      } catch (e) {
        console.log("request accounts error:");
      }
    },
    async connectAccount() {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        this.address = accounts[0];
        this.getBalance();
        this.getGasPrice();
        //this.refresher();
        this.shortAddress = `${accounts[0].substr(0, 6)}...${accounts[0].slice(
          -4
        )}`;
      } catch (e) {
        console.log("request accounts error:", e);
      }
    },
    async switchToBSCChain() {
      let chainIds = "0x38";
      let rpc = "https://bsc-dataseed.binance.org/";
      let browser = "https://bscscan.com";
      let chainName = "Binance Smart Chain";
      try {
        this.currentChainId = await ethereum.request({ method: "eth_chainId" });
        if (this.currentChainId === chainIds) {
          window.alert("BSC Network has been added to Metamask.");
        }
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIds }],
        });
      } catch (e) {
        if (e.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainIds,
                  chainName: chainName,
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: [rpc],
                  blockExplorerUrls: [browser],
                },
              ],
            });
            this.currentChainId = await ethereum.request({
              method: "eth_chainId",
            });
          } catch (e) {
            console.log("add network error", e);
          }
        }
      }
    },
    getBalance() {
      ethereum
        .request({
          method: "eth_getBalance",
          params: [this.address],
        })
        .then((result) => {
          this.balance = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
    getGasPrice() {
      ethereum
        .request({
          method: "eth_gasPrice",
          params: [],
        })
        .then((result) => {
          console.log("gasprice", result);
          this.price = Utils.toNEAT(result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    bnbrate() {
      const bnburl =
        "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
      axios
        .get(bnburl)
        .then((response) => (this.bnbprice = response.data.price));
    },
    totalUSDcalc() {
      this.totalUSD = this.amountToBuy * 0.025;
      this.totalBNB = this.totalUSD / this.bnbprice;
    },
    async neatBuy() {
      let bnbAmountToSend = this.amountToBuy * (0.025 / this.bnbprice);
      const params = [
        {
          from: this.address,
          to: "0xdd112cb6a0afb5b589c75c144f857d3093f0aff5",
          value: Utils.toHex(Utils.fromNEAT(`${bnbAmountToSend}`)),
          gas: Utils.toHex("21000"),
          gasPrice: Utils.toHex(Utils.fromNEAT(this.price)),
        },
      ];
      ethereum
        .request({
          method: "eth_sendTransaction",
          params,
        })
        .then((result) => {
          console.log("hash", result);
          this.$alert(
            "NOTE:  It can take up to 24h to recieve your NEAT coins.",
            `You succesfully bought ${this.amountToBuy} NEAT. \n Thank you!`,
            {
              confirmButtonText: this.$t("CLOSE"),
              type: "success",
            }
          );
        })
        .catch((error) => {
          console.log("tx error", error);
        });
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  .main {
    width: 80%;
    padding: 10px;
  }
  .right {
    width: 100%;
  }
}
@media only screen and (max-width: 500px) {
  .menu,
  .main,
  .right {
    width: auto;
    padding: 10px;
  }
}
button {
  border: none;
  min-width: 40px;
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  color: #00ffff;
  box-shadow: inset 0 0 0.1em #00ffff, 0 0 0.1em #00ffff;
  border: #00ffff solid 1px;
  background-color: #24292f;
  border-radius: 4px;
  outline: none;
  margin: 0px 0px 0px 60px;
}
.info {
  display: inline-block;
  margin-left: 10px;
  margin-top: 50px;
}
.ntrk {
  margin: 0 auto;
  justify-content: center;
}
.main {
  padding: 10px;
}
.address-title {
  margin-bottom: 5px;
  margin-top: 10px;
  width: auto;
}
.wallet-address {
  margin-bottom: 5px;
  margin-left: 48px;
  margin-top: 10px;
  width: auto;
  color: #7192b3;
}
.inputs {
  background-color: #000;
  border-radius: 10px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #00ffff;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  width: 100%;
  text-align: center;
}
::-webkit-input-placeholder {
  text-align: center;
}
:-moz-placeholder {
  text-align: center;
}
.cmm {
  font-size: 40px;
  color: #00ffff;
  text-align: center;
  margin-top: 120px;
}
.dashboard4 {
  font-size: 14px;
  margin-top: 20px;
  color: #fff;
}
.noteText {
  padding: 40px;
}
.noteText2 {
  margin: 10px;
}
@media only screen and (max-width: 540px) {
  .wallet-address {
    margin-bottom: 5px;
    margin-left: 18px;
    margin-top: 10px;
    width: auto;
    color: #7192b3;
  }
  .bnblogo {
    margin-left: 12px;
    margin-top: 32px;
  }
  .noDisplay {
    display: none;
  }
}
@media only screen and (min-width: 1200px) {
  .displayIt {
    display: none;
  }
}
.bnblogo {
  margin-left: 36px;
  margin-top: 32px;
}
.info-box {
  padding-top: 40px;
  text-align: center;
  margin: 0 auto;
}
.card-text {
  background-color: #000;
  padding-top: 10px;
  padding-bottom: 5px;
}
.bnbimg {
  width: 48px;
  height: 48px;
}
.buyimg {
  width: 100vw;
  max-width: 720px;
}
.card-number {
  color: #00ffff;
  margin-top: 10px;
  margin-bottom: 10px;
}
.gt {
  width: 280px;
  height: 44px;
  margin-left: 450px;
  margin-top: 50px;
  color: #000;
}
.button {
  color: #000;
  text-align: center;
  width: 50%;
  margin: 0 auto;
}
.itemNeat {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}
.neatrate {
  text-align: center;
  color: #00ffff;
  margin-bottom: 15px;
  font-size: 24px;
}
.neatrate-bnb {
  text-align: center;
  color: #7192b3;
  margin-top: 5px;
}
.btn {
  display: flex;
}
#gtButton {
  width: 140px;
  height: 40px;
  color: #000000;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #00ffff;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 16px;
  font-weight: bold;
}
#gtButton:hover {
  background-color: #00ffff;
}
</style>

<style>
.el-message-box__message p {
  margin: 0 !important;
  line-height: 24px !important;
}
.el-message-box__title {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.el-message-box__message {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>