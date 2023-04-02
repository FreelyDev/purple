import "@ethersproject/shims"
import { currentNetwork, getContractObj } from ".";
import { ICOEngineDetail } from "./typs";
import { BigNumber, ethers } from "ethers";
import { RPC_URLS } from "./connectors";
import toast from "react-hot-toast";


export async function getICOEngineInfo(account) {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RPC_URLS[currentNetwork]);
    const ICOContract = getContractObj('SWCT_ICO', currentNetwork, jsonProvider);
    const TokenContract = getContractObj('SWCT_Token', currentNetwork, jsonProvider);

    try {
        const [
            SWCTDecimals,
            ICOEnded,
            MATICBalance,

            depositPrivate,
            claimPrivate,
            totalDepositPrivate,
            pricePrivate,
            maxContributePrivate,
            startTimestampPrivate,
            endTimestampPrivate,
            hardcapPrivate,

            depositPresale,
            claimPresale,
            totalDepositPresale,
            pricePresale,
            maxContributePresale,
            startTimestampPresale,
            endTimestampPresale,
            hardcapPresale,

            depositPublic,
            claimPublic,
            totalDepositPublic,
            pricePublic,
            maxContributePublic,
            startTimestampPublic,
            endTimestampPublic,
            hardcapPublic,
        ] = await Promise.all([
            TokenContract.decimals(),
            ICOContract.ICO_ENDED(),
            account ? jsonProvider.getBalance(account) : BigNumber.from(0),

            account ? ICOContract.MAP_DEPOSIT_PRIVATE(account) : BigNumber.from(0),
            account ? ICOContract.MAP_CLAIM_PRIVATE(account) : BigNumber.from(0),
            ICOContract.TOTAL_DEPOSIT_PRIVATE(),
            ICOContract.SWCT_PRICE_PRIVATE(),
            ICOContract.MAX_CONTRIBUTE_PRIVATE(),
            ICOContract.START_DATETIME_PRIVATE(),
            ICOContract.END_DATETIME_PRIVATE(),
            ICOContract.HARDCAP_PRIVATE(),

            account ? ICOContract.MAP_DEPOSIT_PRESALE(account) : BigNumber.from(0),
            account ? ICOContract.MAP_CLAIM_PRESALE(account) : BigNumber.from(0),
            ICOContract.TOTAL_DEPOSIT_PRESALE(),
            ICOContract.SWCT_PRICE_PRESALE(),
            ICOContract.MAX_CONTRIBUTE_PRESALE(),
            ICOContract.START_DATETIME_PRESALE(),
            ICOContract.END_DATETIME_PRESALE(),
            ICOContract.HARDCAP_PRESALE(),

            account ? ICOContract.MAP_DEPOSIT_PUBLIC(account) : BigNumber.from(0),
            account ? ICOContract.MAP_CLAIM_PUBLIC(account) : BigNumber.from(0),
            ICOContract.TOTAL_DEPOSIT_PUBLIC(),
            ICOContract.SWCT_PRICE_PUBLIC(),
            ICOContract.MAX_CONTRIBUTE_PUBLIC(),
            ICOContract.START_DATETIME_PUBLIC(),
            ICOContract.END_DATETIME_PUBLIC(),
            ICOContract.HARDCAP_PUBLIC(),
        ]);

        const ICOEngine: ICOEngineDetail = {
            ICOEnded: ICOEnded,
            MATICBalance: parseFloat(ethers.utils.formatEther(MATICBalance)),

            depositPrivate: parseFloat(ethers.utils.formatEther(depositPrivate)),
            claimPrivate: parseFloat(ethers.utils.formatUnits(claimPrivate, SWCTDecimals)),
            totalDepositPrivate: parseFloat(ethers.utils.formatEther(totalDepositPrivate)),
            pricePrivate: parseFloat(ethers.utils.formatUnits(pricePrivate, (18 - SWCTDecimals))),
            maxContributePrivate: parseFloat(ethers.utils.formatEther(maxContributePrivate)),
            startTimestampPrivate: startTimestampPrivate.toNumber(),
            endTimestampPrivate: endTimestampPrivate.toNumber(),
            hardcapPrivate: parseFloat(ethers.utils.formatEther(hardcapPrivate)),

            depositPresale: parseFloat(ethers.utils.formatEther(depositPresale)),
            claimPresale: parseFloat(ethers.utils.formatUnits(claimPresale, SWCTDecimals)),
            totalDepositPresale: parseFloat(ethers.utils.formatEther(totalDepositPresale)),
            pricePresale: parseFloat(ethers.utils.formatUnits(pricePresale, (18 - SWCTDecimals))),
            maxContributePresale: parseFloat(ethers.utils.formatEther(maxContributePresale)),
            startTimestampPresale: startTimestampPresale.toNumber(),
            endTimestampPresale: endTimestampPresale.toNumber(),
            hardcapPresale: parseFloat(ethers.utils.formatEther(hardcapPresale)),

            depositPublic: parseFloat(ethers.utils.formatEther(depositPublic)),
            claimPublic: parseFloat(ethers.utils.formatUnits(claimPublic, SWCTDecimals)),
            totalDepositPublic: parseFloat(ethers.utils.formatEther(totalDepositPublic)),
            pricePublic: parseFloat(ethers.utils.formatUnits(pricePublic, (18 - SWCTDecimals))),
            maxContributePublic: parseFloat(ethers.utils.formatEther(maxContributePublic)),
            startTimestampPublic: startTimestampPublic.toNumber(),
            endTimestampPublic: endTimestampPublic.toNumber(),
            hardcapPublic: parseFloat(ethers.utils.formatEther(hardcapPublic)),
        }

        return ICOEngine;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/*************** CONTRIBUTE ***************/

export async function contributePrivate(chainId, provider, account, amount) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const depositMATIC: BigNumber = ethers.utils.parseEther(amount.toString());
        const maxContribute: BigNumber = await ICOContract.MAX_CONTRIBUTE_PRIVATE();
        const currentDeposit: BigNumber = await ICOContract.MAP_DEPOSIT_PRIVATE(account);
        const isPrivated = await ICOContract.MAP_PRIVATE_LIST(account);

        if (!isPrivated) {
            toast.error("Your wallet is not registered to private list");
            return false;
        }

        if (maxContribute.lt(currentDeposit.add(depositMATIC))) {
            toast.error("Deposit Amount should be lower than Max Contribute.");
            return false;
        }

        const tx = await ICOContract.contributeForPrivate({
            value: depositMATIC
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function contributePresale(chainId, provider, account, amount) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const depositMATIC: BigNumber = ethers.utils.parseEther(amount.toString());
        const maxContribute: BigNumber = await ICOContract.MAX_CONTRIBUTE_PRIVATE();
        const currentDeposit: BigNumber = await ICOContract.MAP_DEPOSIT_PRIVATE(account);

        if (maxContribute.lt(currentDeposit.add(depositMATIC))) {
            toast.error("Deposit Amount should be lower than Max Contribute.");
            return false;
        }

        const tx = await ICOContract.contributeForPresale({
            value: depositMATIC
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export async function contributePublic(chainId, provider, account, amount) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const depositMATIC: BigNumber = ethers.utils.parseEther(amount.toString());
        const maxContribute: BigNumber = await ICOContract.MAX_CONTRIBUTE_PRIVATE();
        const currentDeposit: BigNumber = await ICOContract.MAP_DEPOSIT_PRIVATE(account);

        if (maxContribute.lt(currentDeposit.add(depositMATIC))) {
            toast.error("Deposit Amount should be lower than Max Contribute.");
            return false;
        }

        const tx = await ICOContract.contributeForPublic({
            value: depositMATIC
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

/*************** CLAIM ***************/

export async function claimPrivate(chainId, provider) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const tx = await ICOContract.claimForPrivate();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimPresale(chainId, provider) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const tx = await ICOContract.claimForPresale();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function claimPublic(chainId, provider) {
    const ICOContract = getContractObj('SWCT_ICO', chainId, provider);
    try {
        const tx = await ICOContract.claimForPublic();
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
