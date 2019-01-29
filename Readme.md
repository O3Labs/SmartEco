# NeoDAPI-Provider-Engine

Ontology-Provider-Engine is a tool for building your own Ontology Provider.

## Concepts

### What is a Provider?

A Neo Provider abstracts a connection with NEO blockchain network such as
querying transactions, sending transactions, signing messages, and so on. It is useful for developers who do not want to build out their own wallet functionality, but still want to access features of the NEO blockchain via a trusted wallet.


### What is the advantage of using Provider?

It is useful for developers who do not want to build out their own wallet functionality, but still want to access features of the NEO blockchain via a trusted wallet. This prevents users from having to trust their private keys with dapps or other unknown entities.

It also prevents ecosystem fragmentation by allowing wallet providers to simply

Since all communications with Ontology blockchain is abstracted, developers can use
the same interface when developing Ontology DApp and prevent fragmentation of dApp
development. 

Also, this trust issue is shifted to Providers, not dApp. So, reliable providers prevent
DApps from malicious actions such as stealing his/her wallet private keys. For example,
when a DApp need to sign transaction, it doesn't need the private key of the wallet to sign, 
instead, it has to request providers to sign the transaction.


### What is the NEODAPI-Provider-Engine?
The NEO DAPI provider

It helps to build oN DAPI provider based on 
[OEP-6](https://github.com/ontio/OEPs/blob/46bbf73958c40e2f4f6b76ce70216a0f6588e7ef/OEP-6/OEP-6.mediawiki) easily.


## Install

Ontology-Provider-Engine is available through npm.

```
npm install NeoDAPI-Provider-Engine
```

## Usage

```typescript
import { NEODapiProviderEngine } from 
```

## Maintenance and Contribution
This package is currently maintained as a collaboration between O3 Labs and NEL. If you wish to register as a provider with in this package, please leave an issue in github.

## License

LGPL