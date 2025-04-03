import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Redux: Actions
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadAMM,
  loadBalances
} from '../store/interactions'

// ABI + config
import config from '../config.json'
import TOKEN_ABI from '../abis/Token.json'

// Components
import Navigation from './Navigation'
import Tabs from './Tabs'
import Swap from './Swap'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Charts from './Charts'

function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Load provider and network
    const provider = await loadProvider(dispatch)
    const chainId = await loadNetwork(provider, dispatch)

    // Listen for network/account changes
    window.ethereum.on('chainChanged', () => window.location.reload())
    window.ethereum.on('accountsChanged', async () => await loadAccount(dispatch))

    // Load account
    const account = await loadAccount(dispatch)

    // Load token contracts and AMM
    await loadTokens(provider, chainId, dispatch)
    const amm = await loadAMM(provider, chainId, dispatch)

    // Load balances
    const token1 = new ethers.Contract(config[chainId].dapp.address, TOKEN_ABI, provider)
    const token2 = new ethers.Contract(config[chainId].usd.address, TOKEN_ABI, provider)
    await loadBalances(amm, [token1, token2], account, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <Container>
      <HashRouter>
        <Navigation />
        <Tabs />
        <Routes>
          <Route exact path="/" element={<Swap />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </HashRouter>
    </Container>
  )
}

export default App
