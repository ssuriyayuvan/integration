"use strict";
const { initMonero } = require('../')
// const assert = require("assert");

var public_key =
	"904e49462268d771cc1649084c35aa1296bfb214880fe2e7f373620a3e2ba597";
var private_key =
	"52aa4c69b93b780885c9d7f51e6fd5795904962c61a2e07437e130784846f70d";

async function t1()
{
	const { mymonero_core_js } = await initMonero()
	const mymonero = mymonero_core_js 
	const nettype = mymonero.nettype_utils.network_type.MAINNET;
	try {
		var decoded = await mymonero.monero_utils.decode_address(
			"49qwWM9y7j1fvaBK684Y5sMbN8MZ3XwDLcSaqcKwjh5W9kn9qFigPBNBwzdq6TCAm2gKxQWrdZuEZQBMjQodi9cNRHuCbTr",
			nettype,
		);
		console.log("decoded", decoded)
	} catch (e) {
		console.log(e)
	}

	try {
		var created = await mymonero.monero_utils.newly_created_wallet(
			"ja",
			nettype,
		);
		console.log("newly_created_wallet", created)
		//
		try {
			var unpacked = await mymonero.monero_utils.seed_and_keys_from_mnemonic(
				created.mnemonic_string,
				nettype,
			);
			console.log("seed_and_keys_from_mnemonic", created)
		} catch (e) {
			console.log(e)
		}
	} catch (e) {
		console.log(e)
	}

	try {
		var fee = new mymonero.JSBigInt(await mymonero.monero_utils.estimated_tx_network_fee(
			"0", 1, "24658"
			// fee_per_kb__string, priority, fee_per_b__string
		));
		console.log("estimated_tx_network_fee", mymonero.monero_amount_format_utils.formatMoneyFull(fee), "XMR")
	} catch (e) {
		console.log(e)
	}


}
t1()
