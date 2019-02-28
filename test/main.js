const errorEle = document.getElementById("error");
const resultEle = document.getElementById("result");
const loadingEle = document.getElementById("loading");
const accountEle = document.getElementById("account");
const disconnectEle = document.getElementById("disconnect");

const balanceInputEle = document.getElementById("balanceInput");

const getStorageScriptHashEle = document.getElementById("getStorageScriptHash");
const getStorageKeyEle = document.getElementById("getStorageKey");

const invokeReadScriptHashEle = document.getElementById("invokeReadScriptHash");
const invokeReadOperationEle = document.getElementById("invokeReadOperation");
const invokeReadArgsEle = document.getElementById("invokeReadArgs");

const invokeScriptHashEle = document.getElementById("invokeScriptHash");
const invokeOperationEle = document.getElementById("invokeOperation");
const invokeArgsEle = document.getElementById("invokeArgs");
const invokeAttachedAssetsEle = document.getElementById("invokeAttachedAssets");
const invokeFeeEle = document.getElementById("invokeFee");
const assetIntentOverridesEle = document.getElementById("assetIntentOverrides");
const triggerContractVerificationEle = document.getElementById("triggerContractVerification");


const sendFromAddressEle = document.getElementById("sendFromAddress");
const sendToAddressEle = document.getElementById("sendToAddress");
const sendAssetEle = document.getElementById("sendAsset");
const sendAmountEle = document.getElementById("sendAmount");
const sendRemarkEle = document.getElementById("sendRemark");
const sendFeeEle = document.getElementById("sendFee");

const networksEle = document.getElementById("networks");

function clearText() {
  resultEle.innerHTML = '';
  errorEle.innerHTML = '';
}

function handleSuccess(data) {
  stopLoading();
  const formatted = syntaxHighlight(data);
  errorEle.innerHTML = ""
  resultEle.innerHTML = formatted;
}

function handleError(error) {
  stopLoading();
  resultEle.innerHTML = ""
  errorEle.innerHTML = syntaxHighlight(error);
}

function startLoading() {
  clearText();
  loadingEle.style = 'display: block;';
}

function stopLoading() {
  loadingEle.style = 'display: none;';
}

stopLoading();

function isReady() {
  o3dapi.NEO.isReady()
  .then(handleSuccess)
  .catch(handleError);
}

function getProvider() {
  smartEcoRouter.getProvider()
  .then(handleSuccess)
  .catch(handleError);
}

function getNetworks() {
  smartEcoRouter.getNetworks()
  .then(handleSuccess)
  .catch(handleError);
}

function getAccount() {
  startLoading();
  smartEcoRouter.getAccount()
  .then(handleSuccess)
  .catch(handleError);
}

function getBalance() {
  try {
    startLoading();
    smartEcoRouter.getBalance({
      params: balanceInputEle.value && JSON.parse(balanceInputEle.value),
      network: networksEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function getStorage() {
  startLoading();
  smartEcoRouter.getStorage({
    scriptHash: getStorageScriptHashEle.value,
    key: getStorageKeyEle.value,
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function invokeRead() {
  try {
    startLoading();
    smartEcoRouter.invokeRead({
      scriptHash: invokeReadScriptHashEle.value,
      operation: invokeReadOperationEle.value,
      args: invokeReadArgsEle.value && JSON.parse(invokeReadArgsEle.value),
      network: networksEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function invoke() {
  try {
    startLoading();
    smartEcoRouter.invoke({
      scriptHash: invokeScriptHashEle.value,
      operation: invokeOperationEle.value,
      args: invokeArgsEle.value && JSON.parse(invokeArgsEle.value),
      attachedAssets: invokeAttachedAssetsEle.value && JSON.parse(invokeAttachedAssetsEle.value),
      fee: invokeFeeEle.value,
      network: networksEle.value,
      assetIntentOverrides: assetIntentOverridesEle.value && JSON.parse(assetIntentOverridesEle.value),
      triggerContractVerification: triggerContractVerificationEle.checked,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function send() {
  startLoading();
  smartEcoRouter.send({
    fromAddress: sendFromAddressEle.value,
    toAddress: sendToAddressEle.value,
    asset: sendAssetEle.value,
    amount: sendAmountEle.value,
    remark: sendRemarkEle.value,
    fee: sendFeeEle.value,
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function disconnect() {
  smartEcoRouter.disconnect()
  .then(data => {
    accountEle.innerHTML = '';
    disconnectEle.innerHTML = '';
    return data;
  })
  .then(handleSuccess)
  .catch(handleError);
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

smartEcoRouter = new smartEco.SmartEcoRouter()
smartEcoRouter.start()

smartEcoRouter.addEventListener(smartEco.EventName.READY, onReady);

smartEcoRouter.addEventListener(smartEco.EventName.CONNECTED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

smartEcoRouter.addEventListener(smartEco.EventName.ACCOUNT_CHANGED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

smartEcoRouter.addEventListener(smartEco.EventName.DISCONNECTED, data => {
  accountEle.innerHTML = '';
  disconnectEle.innerHTML = '';
  clearText();
});

function onReady() {
  smartEcoRouter.getNetworks()
  .then(({networks, defaultNetwork}) => {
    networks.forEach(network => {
      const option = document.createElement('option');
      if (network === defaultNetwork) {
        option.selected = 'selected';
      }
      option.value = network;
      option.label = network;
      networksEle.append(option);
    });
  });
};
