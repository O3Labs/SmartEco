import { NEOProvider, NEOProviderPayload, NEOProviderAPI } from "./provider";
import { getAccount, getBalance, getProvider, getNetworks } from "o3-dapi-neo"
import { SmartEcoRouter } from "./provider-engine";
import { EventName } from "./constants"

const smartEco = {
    SmartEcoRouter,
    EventName,
}

export default smartEco;