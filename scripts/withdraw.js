const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContractAt("FundMe", deployer)

    console.log("Funding...")

    const txResponse = await fundMe.withdraw()
    await txResponse.wait(1)

    console.log("Withdraw done...")
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
