const { getNamedAccounts, ethers, deployments, network } = require("hardhat")
const { developerChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developerChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer

              const fundMeInterface = await deployments.get("FundMe")
              fundMe = await ethers.getContractAt(
                  fundMeInterface.abi,
                  fundMeInterface.address
              )
          })

          it("allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()

              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )

              assert.equal(endingBalance.toString(), 0)
          })
      })
