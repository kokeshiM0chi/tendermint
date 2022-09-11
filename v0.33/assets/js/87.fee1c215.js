(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{681:function(e,t,a){"use strict";a.r(t);var n=a(1),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-017-chain-versions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-017-chain-versions"}},[e._v("#")]),e._v(" ADR 017: Chain Versions")]),e._v(" "),a("h2",{attrs:{id:"todo"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#todo"}},[e._v("#")]),e._v(" TODO")]),e._v(" "),a("ul",[a("li",[e._v("clarify how to handle slashing when ChainID changes")])]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("28-07-2018: Updates from review\n"),a("ul",[a("li",[e._v("split into two ADRs - one for protocol, one for chains")])])]),e._v(" "),a("li",[e._v("16-07-2018: Initial draft - was originally joint ADR for protocol and chain\nversions")])]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("Software and Protocol versions are covered in a separate ADR.")]),e._v(" "),a("p",[e._v("Here we focus on chain versions.")]),e._v(" "),a("h2",{attrs:{id:"requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirements"}},[e._v("#")]),e._v(" Requirements")]),e._v(" "),a("p",[e._v("We need to version blockchains across protocols, networks, forks, etc.\nWe need chain identifiers and descriptions so we can talk about a multitude of chains,\nand especially the differences between them, in a meaningful way.")]),e._v(" "),a("h3",{attrs:{id:"networks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#networks"}},[e._v("#")]),e._v(" Networks")]),e._v(" "),a("p",[e._v("We need to support many independent networks running the same version of the software,\neven possibly starting from the same initial state.\nThey must have distinct identifiers so that peers know which one they are joining and so\nvalidators and users can prevent replay attacks.")]),e._v(" "),a("p",[e._v("Call this the "),a("code",[e._v("NetworkName")]),e._v(" (note we currently call this "),a("code",[e._v("ChainID")]),e._v(" in the software. In this\nADR, ChainID has a different meaning).\nIt represents both the application being run and the community or intention\nof running it.")]),e._v(" "),a("p",[e._v("Peers only connect to other peers with the same NetworkName.")]),e._v(" "),a("h3",{attrs:{id:"forks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#forks"}},[e._v("#")]),e._v(" Forks")]),e._v(" "),a("p",[e._v("We need to support existing networks upgrading and forking, wherein they may do any of:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("- revert back to some height, continue with the same versions but new blocks\n- arbitrarily mutate state at some height, continue with the same versions (eg. Dao Fork)\n- change the AppVersion at some height\n")])])]),a("p",[e._v('Note because of Tendermint\'s voting power threshold rules, a chain can only be extended under the "original" rules and under the new rules\nif 1/3 or more is double signing, which is expressly prohibited, and is supposed to result in their punishment on both chains. Since they can censor\nthe punishment, the chain is expected to be hardforked to remove the validators. Thus, if both branches are to continue after a fork,\nthey will each require a new identifier, and the old chain identifier will be retired (ie. only useful for syncing history, not for new blocks)..')]),e._v(" "),a("p",[e._v("TODO: explain how to handle slashing when chain id changed!")]),e._v(" "),a("p",[e._v("We need a consistent way to describe forks.")]),e._v(" "),a("h2",{attrs:{id:"proposal"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#proposal"}},[e._v("#")]),e._v(" Proposal")]),e._v(" "),a("h3",{attrs:{id:"chaindescription"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chaindescription"}},[e._v("#")]),e._v(" ChainDescription")]),e._v(" "),a("p",[e._v("ChainDescription is a complete immutable description of a blockchain. It takes the following form:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"Q2hhaW5EZXNjcmlwdGlvbiA9ICZsdDtOZXR3b3JrTmFtZSZndDsvJmx0O0Jsb2NrVmVyc2lvbiZndDsvJmx0O0FwcFZlcnNpb24mZ3Q7LyZsdDtTdGF0ZUhhc2gmZ3Q7LyZsdDtWYWxIYXNoJmd0Oy8mbHQ7Q29uc2Vuc3VzUGFyYW1zSGFzaCZndDsK"}}),e._v(" "),a("p",[e._v("Here, StateHash is the merkle root of the initial state, ValHash is the merkle root of the initial Tendermint validator set,\nand ConsensusParamsHash is the merkle root of the initial Tendermint consensus parameters.")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("genesis.json")]),e._v(" file must contain enough information to compute this value. It need not contain the StateHash or ValHash itself,\nbut contain the state from which they can be computed with the given protocol versions.")]),e._v(" "),a("p",[e._v("NOTE: consider splitting NetworkName into NetworkName and AppName - this allows\nfolks to independently use the same application for different networks (ie we\ncould imagine multiple communities of validators wanting to put up a Hub using\nthe same app but having a distinct network name. Arguably not needed if\ndifferences will come via different initial state / validators).")]),e._v(" "),a("h4",{attrs:{id:"chainid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chainid"}},[e._v("#")]),e._v(" ChainID")]),e._v(" "),a("p",[e._v("Define "),a("code",[e._v("ChainID = TMHASH(ChainDescriptor)")]),e._v(". It's the unique ID of a blockchain.")]),e._v(" "),a("p",[e._v("It should be Bech32 encoded when handled by users, eg. with "),a("code",[e._v("cosmoschain")]),e._v(" prefix.")]),e._v(" "),a("h4",{attrs:{id:"forks-and-uprades"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#forks-and-uprades"}},[e._v("#")]),e._v(" Forks and Uprades")]),e._v(" "),a("p",[e._v("When a chain forks or upgrades but continues the same history, it takes a new ChainDescription as follows:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"Q2hhaW5EZXNjcmlwdGlvbiA9ICZsdDtDaGFpbklEJmd0Oy94LyZsdDtIZWlnaHQmZ3Q7LyZsdDtGb3JrRGVzY3JpcHRpb24mZ3Q7Cg=="}}),e._v(" "),a("p",[e._v("Where")]),e._v(" "),a("ul",[a("li",[e._v("ChainID is the ChainID from the previous ChainDescription (ie. its hash)")]),e._v(" "),a("li",[a("code",[e._v("x")]),e._v(" denotes that a change occured")]),e._v(" "),a("li",[a("code",[e._v("Height")]),e._v(" is the height the change occured")]),e._v(" "),a("li",[e._v("ForkDescription has the same form as ChainDescription but for the fork")]),e._v(" "),a("li",[e._v("this allows forks to specify new versions for tendermint or the app, as well as arbitrary changes to the state or validator set")])])],1)}),[],!1,null,null,null);t.default=s.exports}}]);