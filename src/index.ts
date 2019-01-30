import { NEOProvider, NEOProviderPayload, NEOProviderAPI } from "./provider";
import { getAccount, getBalance, getProvider, getNetworks } from "o3-dapi-neo"
import { NEOProviderEngine } from "./provider-engine";
import { EventName } from "./constants"

const smartEco = {
    NEOProviderEngine,
    EventName,
}

export default smartEco;