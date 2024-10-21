var userAddress = "";
var contractBalanceRate = 0;
var userPercentRate = 0;
var userAvailable = 0;
var userTotalDeposits = 0;
var userTotalWithdrawn = 0;
var userAmountOfDeposits = 0;
var userLastDepositTime = 0;
console.log("MainCode js file calling succesful");

function getFormattedDate(date) {
  let hour = ("0" + date.getUTCHours()).slice(-2);
  let minute = ("0" + date.getUTCMinutes()).slice(-2);
  let day = ("0" + date.getUTCDate()).slice(-2);
  let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  let year = date.getUTCFullYear();
  return hour + ":" + minute + " " + day + "." + month + "." + year;
}

function getFormattedNumber(num) {
  var num = num + "";
  var value = Number(num);
  var res = num.split(".");
  if (res[0].length <= 2) {
    return value.toFixed(6);
  } else if (res[0].length == 3) {
    return value.toFixed(5);
  } else if (res[0].length == 4) {
    return value.toFixed(4);
  } else if (res[0].length == 5) {
    return value.toFixed(3);
  } else if (res[0].length == 6) {
    return value.toFixed(2);
  } else if (res[0].length == 7) {
    return value.toFixed(1);
  } else if (res[0].length >= 8) {
    return value.toFixed(0);
  }
}

var abi = [{"inputs":[{"internalType":"address payable","name":"marketingAddr","type":"address"},{"internalType":"address payable","name":"projectAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalAmount","type":"uint256"}],"name":"FeePayed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"BASE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"LEADER_BONUS_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MARKETING_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_HOLD_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_LEADER_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROJECT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getHoldBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getLeaderBonusRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailableBalanceForWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserMatchBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserPercentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserRefEarnings","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReinvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"referrer","type":"address"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"marketingAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"projectAddress","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

$(function () {
  setTimeout(() => {
    tronWeb.trx.getBalance(contractAddress).then((result) => {
      let balance = tronWeb.toDecimal(result) / 1000000;
      let b = parseFloat(getFormattedNumber(balance));
      $(".contractBalance").html(b);
    });

    loadTrasaction();
  }, 500);

  let search = window.location.search;

  function GetQueryValue(queryName) {
    var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    var r = search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }

  const ref = GetQueryValue("ref");
  console.log("ref===", ref);

  localStorage.setItem("ref", ref || refererDefault);

  function setUserAddress(address) {
    $(".trxWallet").val(address);
    $(".trxWalletTa125").html(
      '<a href="https://www.tronking.live/?ref=' +
        address +
        '"><img src="https://tronsense.net/img/125.gif" width="125" height="125" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>'
    );
    $(".trxWalletTa468").html(
      '<a href="https://www.tronking.live/?ref=' +
        address +
        '"><img src="https://tronsense.net/img/125.gif" width="468" height="60" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>'
    );
    $(".trxWalletTa728").html(
      '<a href="https://www.tronking.live/?ref=' +
        address +
        '"><img src="https://tronsense.net/img/125.gif" width="728" height="90" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>'
    );
    $(".reflink").html("https://www.tronking.live/?ref=" + address);
    $("#reflink").val("https://www.tronking.live/?ref=" + address);
  }

  var obj = setInterval(async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      clearInterval(obj);
      userAddress = window.tronWeb.defaultAddress.base58;
      $(".authFalse").hide();
      $(".authTrue").attr("style", "display:block !important");
      setUserAddress(userAddress);
      updateFull();
      setTimeout(function () {
        var accountInterval = setInterval(async () => {
          if (window.tronWeb.defaultAddress.base58 !== userAddress) {
            userAddress = window.tronWeb.defaultAddress.base58;
            setUserAddress(userAddress);
            updateFull();
          }
        }, 100);
      }, 5000);
    }
  }, 10);

  async function invest(n) {
    var amount = parseFloat(
      $(".trxAmount" + n)
        .val()
        .replace(",", ".")
    );
    if (!amount) {
      $(".trxAmountError" + n + "1").show();
    } else if (amount < 100) {
      $(".trxAmountError" + n + "2").show();
    } else {
      amount = Math.floor(amount * 1000000);
      if (!tronWeb.isAddress(userReferer)) {
        userReferer = refererDefault;
      }
      let _userReferer = localStorage.getItem("ref") || refererDefault;

      console.log("_userReferer===", _userReferer);

        try {
        // Get the contract instance
        let instance = await tronWeb.contract(abi, contractAddress);

        // Send the transaction with the specified amount and callValue
        let res = await instance.invest(_userReferer).send({
          callValue: amount,  // Transaction amount
          feeLimit: 400000000  // Gas fee limit (1 TRX in SUN)
        });

        // Show a success alert after the investment is successful
        alert("Investment successful!");

        // Open wallet modal if it's not visible
        if (!$('div[data-remodal-id="wallet"]').is(":visible")) {
          $("#goToWallet").trigger("click");
        }

        // Update the UI or data after 5 seconds
        setTimeout(function () {
          updateFull();
        }, 5000);
      } catch (error) {
        console.error("Transaction failed", error);
        alert("Investment failed. Please try again.");
      }
    }
  }

  $(".investButton1").click(function (e) {
    e.preventDefault();
    invest(1);
    return false;
  });
  $(".investButton2").click(function (e) {
    e.preventDefault();
    invest(2);
    return false;
  });
  $(".trxAmount1").on("input", function () {
    $(".trxAmountError11").hide();
    $(".trxAmountError12").hide();
  });
  $(".trxAmount2").on("input", function () {
    $(".trxAmountError21").hide();
    $(".trxAmountError22").hide();
  });

  async function withdraw() {
    try {
      let instance = await tronWeb.contract(abi, contractAddress);
      let res = await instance.withdraw().send({ callValue: 0 });
      if (!$('div[data-remodal-id="wallet"]').is(":visible")) {
        $("#goToWallet").trigger("click");
      }
      setTimeout(function () {
        updateFull();
      }, 5000);
    } catch (error) {}
  }

  $(".withdrawButton").click(function (e) {
    e.preventDefault();
    withdraw();
    return false;
  });

  // async function getContractBalanceRate() {
  //   let instance = await tronWeb.contract(abi, contractAddress);
  //   let res = await instance.getContractBalanceRate().call();
  //   contractBalanceRate = tronWeb.toDecimal(res);
  //   contractBalanceRate = (contractBalanceRate - 10) / 10;
  //   contractBalanceRate = contractBalanceRate.toFixed(1);
  //   $(".contractBalanceRate").html("+" + contractBalanceRate + "%");
  // }

  // async function getUserPercentRate() {
  //   await getContractBalanceRate();
  //   let instance = await tronWeb.contract(abi, contractAddress);
  //   let res = await instance.getUserPercentRate(userAddress).call();
  //   userPercentRate = tronWeb.toDecimal(res);
  //   userPercentRate = userPercentRate / 10;
  //   userPercentRate = userPercentRate.toFixed(1);
  //   $(".userPercentRate").html("+" + userPercentRate + "%");
  //   var basicPercentRate = 1;
  //   basicPercentRate = basicPercentRate.toFixed(1);
  //   holdPercentRate = userPercentRate - contractBalanceRate - basicPercentRate;
  //   holdPercentRate = holdPercentRate.toFixed(1);
  //   $(".holdPercentRate").html("+" + holdPercentRate + "%");
  //   $(".basicPercentRate").html("+" + basicPercentRate + "%");
  // }

  // async function getUserAvailable() {
  //   let instance = await tronWeb.contract(abi, contractAddress);
  //   let res = await instance.getUserAvailable(userAddress).call();
  //   userAvailable = tronWeb.toDecimal(res);
  //   userAvailableTrx = userAvailable / 1000000;
  //   userAvailableTrx = parseFloat(getFormattedNumber(userAvailableTrx));
  //   $(".userAvailable").html(userAvailableTrx);
  // }
  console.log("test case 2");
  async function getUserTotalDeposits() {
    console.log("test case 3.1");
    const instance = await tronWeb.contract(abi, contractAddress);
    console.log("test case 4");
    const res = await instance
      .getUserTotalDeposits(userAddress)
      .call();
    console.log("test case 3 Investment Total amount :", res.toString());
    const userTotalDepositsconst = tronWeb.toDecimal(res);
    const userTotalDepositsTrxconst = userTotalDepositsconst / 1000000;
    userTotalDepositsTrxconst = parseFloat(
      getFormattedNumber(userTotalDepositsTrxconst)
    );
    $(".userTotalDeposits").html(userTotalDepositsTrxconst);
    console.log("test case 5");
  }

  async function getUserTotalWithdrawn() {
    await getUserAvailable();
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getUserTotalWithdrawn(userAddress).call();
    userTotalWithdrawn = tronWeb.toDecimal(res);
  }

  async function getUserAmountOfDeposits() {
    let instance = await tronWeb.contract(abi, contractAddress);
    let res = await instance.getUserAmountOfDeposits(userAddress).call();
    userAmountOfDeposits = tronWeb.toDecimal(res);
    $(".userAmountOfDeposits").html(userAmountOfDeposits);
  }

  async function getUserLastDepositTime() {
    await getUserAmountOfDeposits();
    if (userAmountOfDeposits > 0) {
      let instance = await tronWeb.contract(abi, contractAddress);
      let res = await instance
        .getUserDepositInfo(userAddress, userAmountOfDeposits - 1)
        .call();
      userLastDepositTime = tronWeb.toDecimal(res[2]);
      userLastDepositTimeFormatted = getFormattedDate(
        new Date(userLastDepositTime * 1000)
      );
      $(".userLastDepositTime").html(userLastDepositTimeFormatted);
      $(".withdrawButton").prop("disabled", false);
      $(".withdrawButton").css("cursor", "pointer");
      $(".withdrawButton").attr("title", "");
    } else {
      $(".userLastDepositTime").html("no deposits");
      $(".withdrawButton").prop("disabled", true);
      $(".withdrawButton").css("cursor", "not-allowed");
      $(".withdrawButton").attr("title", "Please make deposit first!");
    }
  }

  async function getUserReferrer() {
    await getUserAmountOfDeposits();
    if (userAmountOfDeposits > 0) {
      let instance = await tronWeb.contract(abi, contractAddress);
      let res = await instance.getUserReferrer(userAddress).call();
      userRefererOld = tronWeb.address.fromHex(res);
      if (userRefererOld != "TEQkamUMZA3n9obPeW2RNk8gyyqDJCQoc5") {
        userReferer = userRefererOld;
        $(".userReferer").html(userReferer);
        $(".userRefererDiv").show();
      }
    }
  }

  function loadTrasaction() {
    // load last transaction
    $.ajax({
      url:
        "https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=50&start=0&address=" +
        contractAddress,
      type: "get",
      dataType: "json",
      success: function (data) {
        if (data && data.data) {
          $(".lastdepowrap").html("");
          let j = 0;
          for (let i = 0; i < data.data.length; i++) {
            if (
              j < 4 &&
              data.data[i]["result"] === "SUCCESS" &&
              data.data[i]["amount"] > 0 &&
              data.data[i]["toAddress"] === contractAddress
            ) {
              j++;
              $(".lastdepowrap").append(
                '<div class="lastdepo" data-scroll="toggle(.fromTopIn, .fromTopOut)">\n' +
                  '                               <span><i class="fas fa-arrow-to-bottom"></i> ' +
                  tronWeb.toDecimal(data.data[i]["amount"]) / 1000000 +
                  " TRX</span>\n" +
                  "                           <span>" +
                  data.data[i]["hash"].substring(0, 10) +
                  "...</span>\n" +
                  '                           <span><a href="https://tronscan.org/#/transaction/' +
                  data.data[i]["hash"] +
                  '" class="maindescbut" target="_blank"><i class="far fa-eye"></i></a></span>\n' +
                  "                           </div>"
              );
            }
          }
        }
      },
    });
  }

  async function updateFull() {
    // await getUserPercentRate();
    await getUserTotalDeposits();
    await getUserTotalWithdrawn();
    await getUserLastDepositTime();
    await getUserReferrer();
    await getUserRefStats();
  }

  async function update() {
    // await getUserPercentRate();
    await getUserTotalDeposits();
    await getUserTotalWithdrawn();
    await getUserLastDepositTime();
    await getUserReferrer();
  }

  async function update2() {
    await getUserRefStats();
  }

  setInterval(async function () {
    var contractBalance = $(".contractBalance").data("max");

    let instance = await tronWeb.contract(abi, contractAddress);
    //         var userAddress = '';
    // var contractBalanceRate = 0;
    // var userPercentRate = 0;
    // var userAvailable = 0;
    // var userTotalDeposits = 0;
    // var userTotalWithdrawn = 0;
    // var userAmountOfDeposits = 0;
    // var userLastDepositTime = 0;
    
    // var obj = setInterval(async () => {
    //   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    //     clearInterval(obj);
    //     userAddress = window.tronWeb.defaultAddress.base58;
    //     $(".authFalse").hide();
    //     $(".authTrue").attr("style", "display:block !important");
    //     setUserAddress(userAddress);
    //     updateFull();
    //     setTimeout(function () {
    //       var accountInterval = setInterval(async () => {
    //         if (window.tronWeb.defaultAddress.base58 !== userAddress) {
    //           userAddress = window.tronWeb.defaultAddress.base58;
    //           setUserAddress(userAddress);
    //           updateFull();
    //         }
    //       }, 100);
    //     }, 5000);
    //   }
    // }, 10);


    // var userAddress = "";
    // var contractBalanceRate = 0;
    // var userPercentRate = 0;
    // var userAvailable = 0;
    // var userTotalDeposits = 0;
    // var userTotalWithdrawn = 0;
    // var userAmountOfDeposits = 0;
    // var userLastDepositTime = 0;

    let res1 = await instance.totalUsers().call();
    leval1 = tronWeb.toDecimal(res1);
    //userLeval1 = parseFloat(getFormattedNumber(leval1));
    $(".totalUsers").html(leval1);
    console.log("test case 1:", leval1);

    let res2 = await instance.totalInvested().call();
    leval2 = tronWeb.toDecimal(res2) / 1000000;
    userLeval2 = parseFloat(getFormattedNumber(leval2));
    $(".totalInvested").html(leval2);
    console.log("test case 2:", leval2);
    console.log("test User Address ", userAddress);
    const walletaddressdata = userAddress;
    console.log("test wallet address:",walletaddressdata)
    let res3 = await instance.getUserTotalDeposits(userAddress).call();
    leval3 = tronWeb.toDecimal(res3)/1000000;
    userLeval3 = parseFloat(getFormattedNumber(leval3));
    $(".userTotalDeposits").html(leval3);
    console.log("test case 3:", leval3);

// // userTotalDeposits
//     let res4 = await instance.getUserTotalWithdrawn(userAddress).call();
//     leval4 = tronWeb.toDecimal(res4)/1000000;
//     userLeval4 = parseFloat(getFormattedNumber(leval4));
//     $('.userTotalWithdrawn').html(leval4);
//     console.log("test case 4:", leval4);

//  userRefsEarned 
// Referral Reward
try {
  let res5 = await instance.getUserRefEarnings(userAddress).call();
  let leval5 = tronWeb.toDecimal(res5);
  
  // Check for null or undefined
  if (leval5 == null) {
      leval5 = 0;
  }

  let userLeval5 = parseFloat(getFormattedNumber(leval5));
  $('.userRefsEarned').html(userLeval5 == NaN ? userLeval5.toString() : 0);

  console.log("test case 5:", leval5);

} catch (error) {
  console.log("Error in test case 5:", userLeval5);
}


// getUserRefEarnings for case 6
try {
  let res6 = await instance.getUserRefEarnings(userAddress).call();
  let leval6 = tronWeb.toDecimal(res6) / 1000000;

  // Check for null or undefined
  if (leval6 == null) {
      leval6 = 0;
  }

  let userLeval6 = parseFloat(getFormattedNumber(leval6));
  // $('.userEarned').html(userLeval6 == NaN ? userLeval6.toString() : 0);

  console.log("test case 6:", userLeval6);

} catch (error) {
  console.log("Error in test case 6:", error);
}


// getUserMatchBonus
let res7 = await instance.getUserMatchBonus (userAddress).call();
leval7 = tronWeb.toDecimal(res7)/1000000;
userLeval7 = parseFloat(getFormattedNumber(leval7));
$('.matchBonus').html(leval7);
console.log("test case 7:", leval7);

// Reinvested Amount
let Reinvest = await instance.getUserReinvested(userAddress).call();
let reinvest = tronWeb.toDecimal(Reinvest)/1000000;
let reinvestAmount = parseFloat(getFormattedNumber(reinvest));
$('.reinvestAmount').html(reinvestAmount);
console.log("test case reinvest:", reinvestAmount);

// // getUserTotalWithdrawn
// let res8 = await instance.getUserTotalWithdrawn (userAddress).call();
// leval8 = tronWeb.toDecimal(res8)/1000000;
// userLeval8 = parseFloat(getFormattedNumber(leval8));
// $('.userTotalWithdrawn').html(leval8);
// console.log("test case 8:", leval8)

// getUserAmountOfDeposits
let res9 = await instance.getUserAmountOfDeposits (userAddress).call();
leval9 = tronWeb.toDecimal(res9);
userLeval9 = parseFloat(getFormattedNumber(leval9));
$('.userAmountOfDeposits').html(leval9);
console.log("test case 9:", leval9);


// getUserAvailableBalanceForWithdrawal
let res10 = await instance.getUserAvailableBalanceForWithdrawal (userAddress).call();
leval10 = tronWeb.toDecimal(res10)/1000000;
console.log("test case 10:match ", leval7);
userLeval10 = parseFloat(getFormattedNumber(leval10 + leval7));
let UserUpdateAvailable =parseFloat(getFormattedNumber(userLeval10));
$('.userAvailable').html(UserUpdateAvailable);
console.log("test case 10:", UserUpdateAvailable);

//GetUserPrecentageRate
// let res11 = await instance.getHoldBonus (userAddress).call();
let userPercentRate = await instance.getUserPercentRate(userAddress).call();
let leaderUserBonus = await instance.getLeaderBonusRate(userAddress).call();

let holdbonustotal = userPercentRate -  leaderUserBonus;



// Divide the holdbonustotal by 10 to get the dividends
let holdBonusDividends = holdbonustotal / 10;

// Now holdBonusDividends contains the result
console.log(holdBonusDividends);
// leval11 = tronWeb.toDecimal(res11)/10;
// userLeval11 = parseFloat(getFormattedNumber(leval11));
$('.holdPercentRate').html(holdBonusDividends);
console.log("test case 11:", holdBonusDividends);



//basicPercentRate
let res12 = await instance.BASE_PERCENT().call();
leval12 = tronWeb.toDecimal(res12)/10;
userLeval12 = parseFloat(getFormattedNumber(leval12));
$('.basicPercentRate').html(leval12);
console.log("test case 12:", leval12)

//dailybalancerate
let res13 = await instance.BASE_PERCENT().call();
let holdbonus = await instance.getHoldBonus(userAddress).call();
let LEADER_BONUS_MAX = await instance.getLeaderBonusRate(userAddress).call();


leval13 = tronWeb.toDecimal(res13)/10;
let LEADER_BONUS_MAX13 = tronWeb.toDecimal(LEADER_BONUS_MAX)/10;
let holdbonus13 = tronWeb.toDecimal(holdbonus)/10;


let total = holdBonusDividends + leval13 + LEADER_BONUS_MAX13;
userLeval13 = parseFloat(getFormattedNumber(total));
$('.dailybalancerate').html(userLeval13);
$('.leaderbonus').html(LEADER_BONUS_MAX13);
console.log("test case 13:", userLeval13)



//Available Referral Bonus

let res14 = await instance.getUserReferralBonus(userAddress).call();
leval14 = tronWeb.toDecimal(res14)/1000000;
userLeval14 = parseFloat(getFormattedNumber(leval14));
$('.userAvailableBonus').html(leval14);
console.log("test case 14:", leval14)


//userdividend

let res15 = await instance.getUserDividends(userAddress).call();
leval15 = tronWeb.toDecimal(res15)/1000000;
userLeval15 = parseFloat(getFormattedNumber(leval15));
$('.userdividend').html(leval15);
console.log("test case 15:", leval15)



// First, get the value of leval4, leval14, and leval7
let res4 = await instance.getUserReinvested (userAddress).call();
let leval4 = tronWeb.toDecimal(res4) / 1000000;
let totalWithdrawnUser = (leval4 * 60 )/40;

console.log("test case 4 leval4:", leval4);

let res14SECOND = await instance.getUserReferralBonus(userAddress).call();
let leval14SECOND = tronWeb.toDecimal(res14SECOND) / 1000000;
console.log("test case 14 leval14:", leval14SECOND);

let res7SECND = await instance.getUserMatchBonus(userAddress).call();
let leval7sECOND = tronWeb.toDecimal(res7SECND) / 1000000;
console.log("test case 7 leval7:", leval7sECOND);

// Assuming leval4, leval14, and leval7 are now properly defined, you can calculate the total
const totalLeval = leval4 + leval14SECOND + leval7sECOND;
console.log("Total of leval4, leval14, and leval7:", leval4);

// Calculate 60% of the total
const userLeval4 = totalLeval * 0.60;
console.log(" test 60% of totalLeval:", userLeval4);
let totalWithdrawnUserflot  = parseFloat(getFormattedNumber(totalWithdrawnUser));
// Update the HTML element with the calculated value
$('.userTotalWithdrawn').html(totalWithdrawnUserflot);
console.log("test case 4 (60% of totalLeval):", totalWithdrawnUserflot);



try {
  // getUserDownlineCount is assumed to return an array or multiple uint256 values for each level
  let res = await instance.getUserDownlineCount(userAddress).call();

  // Assuming res is an array [level1, level2, level3]
  let level1 = tronWeb.toDecimal(res[0]); // 1st level downline
  let level2 = tronWeb.toDecimal(res[1]); // 2nd level downline
  let level3 = tronWeb.toDecimal(res[2]); // 3rd level downline
  let level4 = tronWeb.toDecimal(res[3]); // 1st level downline
  let level5 = tronWeb.toDecimal(res[4]); // 2nd level downline
  let level6 = tronWeb.toDecimal(res[5]); // 3rd level downline
  let level7 = tronWeb.toDecimal(res[6]); // 1st level downline
  let level8 = tronWeb.toDecimal(res[7]); // 2nd level downline


  // Update the HTML elements with the downline counts
  $(".userRefsLevel1").html(level1);
  $(".userRefsLevel2").html(level2);
  $(".userRefsLevel3").html(level3);
  $(".userRefsLevel4").html(level4);
  $(".userRefsLevel5").html(level5);
  $(".userRefsLevel6").html(level6);
  $(".userRefsLevel7").html(level7);
  $(".userRefsLevel8").html(level8);




  // Log the values for debugging
  console.log("1st Level Downline:", level1);
  console.log("2nd Level Downline:", level2);
  console.log("3rd Level Downline:", level3);
  console.log("4th Level Downline:", level4);
  console.log("5th Level Downline:", level5);
  console.log("6th Level Downline:", level6);
  console.log("7th Level Downline:", level7);
  console.log("8th Level Downline:", level8);




} catch (error) {
  console.error("Error fetching downline count:", error);
}


  }, 5000);

  setInterval(async function () {
    tronWeb.trx.getBalance(contractAddress).then((result) => {
      let balance = tronWeb.toDecimal(result) / 1000000;
      let b = parseFloat(getFormattedNumber(balance));
      $(".contractBalance").html(b);
    });
  }, 8000);

  setInterval(function () {
    if (userAddress) {
      update();
    }

    loadTrasaction();
  }, 15000);
  var clipboard = new ClipboardJS(".buttoncopy");
  // $(".langwrap").click(function (e) {
  //     e.preventDefault();
  //     var classes = $(this).attr('class').split(" ").toString();
  //     var lang = classes.substr(classes.length - 2);
  //     if (language != lang && lang.match(/^[a-z]{2}$/)) {
  //         $.ajax({
  //             type: "post", url: "/language/set", data: {language: lang}, success: function (data) {
  //                 window.location.reload(false)
  //             }
  //         })
  //     }
  //     return false
  // });
  $(".numbers").on("keypress keyup blur", function (event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9\.|\,]/g, "")
    );
    if (event.which == 44) {
      return true;
    }
    if (
      (event.which != 46 || $(this).val().indexOf(".") != -1) &&
      (event.which < 48 || event.which > 57)
    ) {
      event.preventDefault();
    }
  });

  function calc() {
    var calcDepositAmount = parseFloat(
      $(".calcDepositAmount").val().replace(",", ".")
    );
    var calcContractBonus = parseFloat(
      $(".calcContractBonus").val().replace(",", ".")
    );
    $(".calcInputedAmount").html(calcDepositAmount);
    if (
      !isNaN(calcDepositAmount) &&
      calcDepositAmount >= 100 &&
      !isNaN(calcContractBonus) &&
      calcContractBonus >= 0
    ) {
      var day = 1;
      var perc = 0;
      var bonus = 0;
      var amount = (perc * calcDepositAmount) / 100;
      var data = "";
      while (amount < calcDepositAmount * 2) {
        perc = 1 + calcContractBonus + bonus / 10;
        amount = amount + (perc * calcDepositAmount) / 100;
        if (amount > calcDepositAmount * 2) {
          amount = calcDepositAmount * 2;
        }
        data +=
          "<span>" +
          day +
          ") +" +
          perc.toFixed(1) +
          "% = " +
          amount.toFixed(1) +
          " TRX</span>";
        day += 1;
        bonus += 1;
      }
    } else {
      data =
        "<br>Please enter correct amount and contract balance bonus percent!";
    }
    $(".calculations").html(data);
  }

  $(".calcDepositAmount,.calcContractBonus").on("keyup change", function () {
    calc();
  });
  if ($(".calcDepositAmount").length > 0) {
    calc();
  }
});