import { http, createConfig } from 'wagmi'
import { sepolia, localhost } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
const projectId = '0c101c25f19420216599830c670e1c52'
export const config = createConfig({
  chains: [localhost, sepolia],
  connectors: [walletConnect({ projectId })],

  transports: {
    [localhost.id]: http('http://172.29.176.1:7545'),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/JSgbm_AYV6AcvefS6EgC3f-9h3YknQsG',
    ),
  },
})
