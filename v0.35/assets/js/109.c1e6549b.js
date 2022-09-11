(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{704:function(e,l,c){"use strict";c.r(l);var g=c(1),t=Object(g.a)({},(function(){var e=this,l=e.$createElement,c=e._self._c||l;return c("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[c("h1",{attrs:{id:"adr-040-blockchain-reactor-refactor"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#adr-040-blockchain-reactor-refactor"}},[e._v("#")]),e._v(" ADR 040: Blockchain Reactor Refactor")]),e._v(" "),c("h2",{attrs:{id:"changelog"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),c("p",[e._v("19-03-2019: Initial draft")]),e._v(" "),c("h2",{attrs:{id:"context"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),c("p",[e._v("The Blockchain Reactor's high level responsibility is to enable peers who are far behind the current state of the\nblockchain to quickly catch up by downloading many blocks in parallel from its peers, verifying block correctness, and\nexecuting them against the ABCI application. We call the protocol executed by the Blockchain Reactor "),c("code",[e._v("fast-sync")]),e._v(".\nThe current architecture diagram of the blockchain reactor can be found here:")]),e._v(" "),c("p",[c("img",{attrs:{src:"img/bc-reactor.png",alt:"Blockchain Reactor Architecture Diagram"}})]),e._v(" "),c("p",[e._v("The current architecture consists of dozens of routines and it is tightly depending on the "),c("code",[e._v("Switch")]),e._v(", making writing\nunit tests almost impossible. Current tests require setting up complex dependency graphs and dealing with concurrency.\nNote that having dozens of routines is in this case overkill as most of the time routines sits idle waiting for\nsomething to happen (message to arrive or timeout to expire). Due to dependency on the "),c("code",[e._v("Switch")]),e._v(", testing relatively\ncomplex network scenarios and failures (for example adding and removing peers) is very complex tasks and frequently lead\nto complex tests with not deterministic behavior ([#3400]). Impossibility to write proper tests makes confidence in\nthe code low and this resulted in several issues (some are fixed in the meantime and some are still open):\n[#3400], [#2897], [#2896], [#2699], [#2888], [#2457], [#2622], [#2026].")]),e._v(" "),c("h2",{attrs:{id:"decision"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),c("p",[e._v("To remedy these issues we plan a major refactor of the blockchain reactor. The proposed architecture is largely inspired\nby ADR-30 and is presented on the following diagram:\n"),c("img",{attrs:{src:"img/bc-reactor-refactor.png",alt:"Blockchain Reactor Refactor Diagram"}})]),e._v(" "),c("p",[e._v("We suggest a concurrency architecture where the core algorithm (we call it "),c("code",[e._v("Controller")]),e._v(") is extracted into a finite\nstate machine. The active routine of the reactor is called "),c("code",[e._v("Executor")]),e._v(" and is responsible for receiving and sending\nmessages from/to peers and triggering timeouts. What messages should be sent and timeouts triggered is determined mostly\nby the "),c("code",[e._v("Controller")]),e._v(". The exception is "),c("code",[e._v("Peer Heartbeat")]),e._v(" mechanism which is "),c("code",[e._v("Executor")]),e._v(" responsibility. The heartbeat\nmechanism is used to remove slow and unresponsive peers from the peer list. Writing of unit tests is simpler with\nthis architecture as most of the critical logic is part of the "),c("code",[e._v("Controller")]),e._v(" function. We expect that simpler concurrency\narchitecture will not have significant negative effect on the performance of this reactor (to be confirmed by\nexperimental evaluation).")]),e._v(" "),c("h3",{attrs:{id:"implementation-changes"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#implementation-changes"}},[e._v("#")]),e._v(" Implementation changes")]),e._v(" "),c("p",[e._v('We assume the following system model for "fast sync" protocol:')]),e._v(" "),c("ul",[c("li",[e._v("a node is connected to a random subset of all nodes that represents its peer set. Some nodes are correct and some\nmight be faulty. We don't make assumptions about ratio of faulty nodes, i.e., it is possible that all nodes in some\npeer set are faulty.")]),e._v(" "),c("li",[e._v("we assume that communication between correct nodes is synchronous, i.e., if a correct node "),c("code",[e._v("p")]),e._v(" sends a message "),c("code",[e._v("m")]),e._v(" to\na correct node "),c("code",[e._v("q")]),e._v(" at time "),c("code",[e._v("t")]),e._v(", then "),c("code",[e._v("q")]),e._v(" will receive message the latest at time "),c("code",[e._v("t+Delta")]),e._v(" where "),c("code",[e._v("Delta")]),e._v(" is a system\nparameter that is known by network participants. "),c("code",[e._v("Delta")]),e._v(" is normally chosen to be an order of magnitude higher than\nthe real communication delay (maximum) between correct nodes. Therefore if a correct node "),c("code",[e._v("p")]),e._v(" sends a request message\nto a correct node "),c("code",[e._v("q")]),e._v(" at time "),c("code",[e._v("t")]),e._v(" and there is no the corresponding reply at time "),c("code",[e._v("t + 2*Delta")]),e._v(", then "),c("code",[e._v("p")]),e._v(" can assume\nthat "),c("code",[e._v("q")]),e._v(" is faulty. Note that the network assumptions for the consensus reactor are different (we assume partially\nsynchronous model there).")])]),e._v(" "),c("p",[e._v('The requirements for the "fast sync" protocol are formally specified as follows:')]),e._v(" "),c("ul",[c("li",[c("code",[e._v("Correctness")]),e._v(": If a correct node "),c("code",[e._v("p")]),e._v(" is connected to a correct node "),c("code",[e._v("q")]),e._v(" for a long enough period of time, then "),c("code",[e._v("p")])]),e._v(" "),c("li",[e._v("will eventually download all requested blocks from "),c("code",[e._v("q")]),e._v(".")]),e._v(" "),c("li",[c("code",[e._v("Termination")]),e._v(": If a set of peers of a correct node "),c("code",[e._v("p")]),e._v(" is stable (no new nodes are added to the peer set of "),c("code",[e._v("p")]),e._v(") for")]),e._v(" "),c("li",[e._v("a long enough period of time, then protocol eventually terminates.")]),e._v(" "),c("li",[c("code",[e._v("Fairness")]),e._v(": A correct node "),c("code",[e._v("p")]),e._v(" sends requests for blocks to all peers from its peer set.")])]),e._v(" "),c("p",[e._v("As explained above, the "),c("code",[e._v("Executor")]),e._v(" is responsible for sending and receiving messages that are part of the "),c("code",[e._v("fast-sync")]),e._v("\nprotocol. The following messages are exchanged as part of "),c("code",[e._v("fast-sync")]),e._v(" protocol:")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlIGludApjb25zdCAoCiAgTWVzc2FnZVVua25vd24gTWVzc2FnZSA9IGlvdGEKICBNZXNzYWdlU3RhdHVzUmVxdWVzdAogIE1lc3NhZ2VTdGF0dXNSZXNwb25zZQogIE1lc3NhZ2VCbG9ja1JlcXVlc3QKICBNZXNzYWdlQmxvY2tSZXNwb25zZQopCg=="}}),e._v(" "),c("p",[c("code",[e._v("MessageStatusRequest")]),e._v(" is sent periodically to all peers as a request for a peer to provide its current height. It is\npart of the "),c("code",[e._v("Peer Heartbeat")]),e._v(" mechanism and a failure to respond timely to this message results in a peer being removed\nfrom the peer set. Note that the "),c("code",[e._v("Peer Heartbeat")]),e._v(" mechanism is used only while a peer is in "),c("code",[e._v("fast-sync")]),e._v(" mode. We assume\nhere existence of a mechanism that gives node a possibility to inform its peers that it is in the "),c("code",[e._v("fast-sync")]),e._v(" mode.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlU3RhdHVzUmVxdWVzdCBzdHJ1Y3QgewogIFNlcU51bSBpbnQ2NCAgICAgLy8gc2VxdWVuY2UgbnVtYmVyIG9mIHRoZSByZXF1ZXN0Cn0K"}}),e._v(" "),c("p",[c("code",[e._v("MessageStatusResponse")]),e._v(" is sent as a response to "),c("code",[e._v("MessageStatusRequest")]),e._v(" to inform requester about the peer current\nheight.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlU3RhdHVzUmVzcG9uc2Ugc3RydWN0IHsKICBTZXFOdW0gaW50NjQgICAgIC8vIHNlcXVlbmNlIG51bWJlciBvZiB0aGUgY29ycmVzcG9uZGluZyByZXF1ZXN0CiAgSGVpZ2h0IGludDY0ICAgICAvLyBjdXJyZW50IHBlZXIgaGVpZ2h0Cn0K"}}),e._v(" "),c("p",[c("code",[e._v("MessageBlockRequest")]),e._v(" is used to make a request for a block and the corresponding commit certificate at a given height.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlQmxvY2tSZXF1ZXN0IHN0cnVjdCB7CiAgSGVpZ2h0IGludDY0Cn0K"}}),e._v(" "),c("p",[c("code",[e._v("MessageBlockResponse")]),e._v(" is a response for the corresponding block request. In addition to providing the block and the\ncorresponding commit certificate, it contains also a current peer height.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlQmxvY2tSZXNwb25zZSBzdHJ1Y3QgewogIEhlaWdodCAgICAgICAgIGludDY0CiAgQmxvY2sgICAgICAgICAgQmxvY2sKICBDb21taXQgICAgICAgICBDb21taXQKICBQZWVySGVpZ2h0ICAgICBpbnQ2NAp9Cg=="}}),e._v(" "),c("p",[e._v("In addition to sending and receiving messages, and "),c("code",[e._v("HeartBeat")]),e._v(" mechanism, controller is also managing timeouts\nthat are triggered upon "),c("code",[e._v("Controller")]),e._v(" request. "),c("code",[e._v("Controller")]),e._v(" is then informed once a timeout expires.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBUaW1lb3V0VHJpZ2dlciBpbnQKY29uc3QgKAogIFRpbWVvdXRVbmtub3duIFRpbWVvdXRUcmlnZ2VyID0gaW90YQogIFRpbWVvdXRSZXNwb25zZVRyaWdnZXIKICBUaW1lb3V0VGVybWluYXRpb25UcmlnZ2VyCikK"}}),e._v(" "),c("p",[e._v("The "),c("code",[e._v("Controller")]),e._v(" can be modelled as a function with clearly defined inputs:")]),e._v(" "),c("ul",[c("li",[c("code",[e._v("State")]),e._v(" - current state of the node. Contains data about connected peers and its behavior, pending requests,")]),e._v(" "),c("li",[e._v("received blocks, etc.")]),e._v(" "),c("li",[c("code",[e._v("Event")]),e._v(" - significant events in the network.")])]),e._v(" "),c("p",[e._v("producing clear outputs:")]),e._v(" "),c("ul",[c("li",[c("code",[e._v("State")]),e._v(" - updated state of the node,")]),e._v(" "),c("li",[c("code",[e._v("MessageToSend")]),e._v(" - signal what message to send and to which peer")]),e._v(" "),c("li",[c("code",[e._v("TimeoutTrigger")]),e._v(" - signal that timeout should be triggered.")])]),e._v(" "),c("p",[e._v("We consider the following "),c("code",[e._v("Event")]),e._v(" types:")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudCBpbnQKY29uc3QgKAogIEV2ZW50VW5rbm93biBFdmVudCA9IGlvdGEKICBFdmVudFN0YXR1c1JlcG9ydAogIEV2ZW50QmxvY2tSZXF1ZXN0CiAgRXZlbnRCbG9ja1Jlc3BvbnNlCiAgRXZlbnRSZW1vdmVQZWVyCiAgRXZlbnRUaW1lb3V0UmVzcG9uc2UKICBFdmVudFRpbWVvdXRUZXJtaW5hdGlvbgopCg=="}}),e._v(" "),c("p",[c("code",[e._v("EventStatusResponse")]),e._v(" event is generated once "),c("code",[e._v("MessageStatusResponse")]),e._v(" is received by the "),c("code",[e._v("Executor")]),e._v(".")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudFN0YXR1c1JlcG9ydCBzdHJ1Y3QgewogIFBlZXJJRCBJRAogIEhlaWdodCBpbnQ2NAp9Cg=="}}),e._v(" "),c("p",[c("code",[e._v("EventBlockRequest")]),e._v(" event is generated once "),c("code",[e._v("MessageBlockRequest")]),e._v(" is received by the "),c("code",[e._v("Executor")]),e._v(".")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudEJsb2NrUmVxdWVzdCBzdHJ1Y3QgewogIEhlaWdodCBpbnQ2NAogIFBlZXJJRCBwMnAuSUQKfQo="}}),e._v(" "),c("p",[c("code",[e._v("EventBlockResponse")]),e._v(" event is generated upon reception of "),c("code",[e._v("MessageBlockResponse")]),e._v(" message by the "),c("code",[e._v("Executor")]),e._v(".")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudEJsb2NrUmVzcG9uc2Ugc3RydWN0IHsKICBIZWlnaHQgICAgICAgICAgICAgaW50NjQKICBCbG9jayAgICAgICAgICAgICAgQmxvY2sKICBDb21taXQgICAgICAgICAgICAgQ29tbWl0CiAgUGVlcklEICAgICAgICAgICAgIElECiAgUGVlckhlaWdodCAgICAgICAgIGludDY0Cn0K"}}),e._v(" "),c("p",[c("code",[e._v("EventRemovePeer")]),e._v(" is generated by "),c("code",[e._v("Executor")]),e._v(" to signal that the connection to a peer is closed due to peer misbehavior.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudFJlbW92ZVBlZXIgc3RydWN0IHsKICBQZWVySUQgSUQKfQo="}}),e._v(" "),c("p",[c("code",[e._v("EventTimeoutResponse")]),e._v(" is generated by "),c("code",[e._v("Executor")]),e._v(" to signal that a timeout triggered by "),c("code",[e._v("TimeoutResponseTrigger")]),e._v(" has\nexpired.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudFRpbWVvdXRSZXNwb25zZSBzdHJ1Y3QgewogIFBlZXJJRCBJRAogIEhlaWdodCBpbnQ2NAp9Cg=="}}),e._v(" "),c("p",[c("code",[e._v("EventTimeoutTermination")]),e._v(" is generated by "),c("code",[e._v("Executor")]),e._v(" to signal that a timeout triggered by "),c("code",[e._v("TimeoutTerminationTrigger")]),e._v("\nhas expired.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBFdmVudFRpbWVvdXRUZXJtaW5hdGlvbiBzdHJ1Y3QgewogIEhlaWdodCBpbnQ2NAp9Cg=="}}),e._v(" "),c("p",[c("code",[e._v("MessageToSend")]),e._v(" is just a wrapper around "),c("code",[e._v("Message")]),e._v(" type that contains id of the peer to which message should be sent.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNZXNzYWdlVG9TZW5kIHN0cnVjdCB7CiAgUGVlcklEICBJRAogIE1lc3NhZ2UgTWVzc2FnZQp9Cg=="}}),e._v(" "),c("p",[e._v("The Controller state machine can be in two modes: "),c("code",[e._v("ModeFastSync")]),e._v(" when\na node is trying to catch up with the network by downloading committed blocks,\nand "),c("code",[e._v("ModeConsensus")]),e._v(" in which it executes Tendermint consensus protocol. We\nconsider that "),c("code",[e._v("fast sync")]),e._v(" mode terminates once the Controller switch to\n"),c("code",[e._v("ModeConsensus")]),e._v(".")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBNb2RlIGludApjb25zdCAoCiAgTW9kZVVua25vd24gTW9kZSA9IGlvdGEKICBNb2RlRmFzdFN5bmMKICBNb2RlQ29uc2Vuc3VzCikK"}}),e._v(" "),c("p",[c("code",[e._v("Controller")]),e._v(" is managing the following state:")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBDb250cm9sbGVyU3RhdGUgc3RydWN0IHsKICBIZWlnaHQgICAgICAgICAgICAgaW50NjQgICAgICAgICAgICAvLyB0aGUgZmlyc3QgYmxvY2sgdGhhdCBpcyBub3QgY29tbWl0dGVkCiAgTW9kZSAgICAgICAgICAgICAgIE1vZGUgICAgICAgICAgICAgLy8gbW9kZSBvZiBvcGVyYXRpb24KICBQZWVyTWFwICAgICAgICAgICAgbWFwW0lEXVBlZXJTdGF0cyAvLyBtYXAgb2YgcGVlciBJRHMgdG8gcGVlciBzdGF0aXN0aWNzCiAgTWF4UmVxdWVzdFBlbmRpbmcgIGludDY0ICAgICAgICAgICAgLy8gbWF4aW11bSBoZWlnaHQgb2YgdGhlIHBlbmRpbmcgcmVxdWVzdHMKICBGYWlsZWRSZXF1ZXN0cyAgICAgW11pbnQ2NCAgICAgICAgICAvLyBsaXN0IG9mIGZhaWxlZCBibG9jayByZXF1ZXN0cwogIFBlbmRpbmdSZXF1ZXN0c051bSBpbnQgICAgICAgICAgICAgIC8vIHRvdGFsIG51bWJlciBvZiBwZW5kaW5nIHJlcXVlc3RzCiAgU3RvcmUgICAgICAgICAgICAgIFtdQmxvY2tJbmZvICAgICAgLy8gY29udGFpbnMgbGlzdCBvZiBkb3dubG9hZGVkIGJsb2NrcwogIEV4ZWN1dG9yICAgICAgICAgICBCbG9ja0V4ZWN1dG9yICAgIC8vIHN0b3JlLCB2ZXJpZnkgYW5kIGV4ZWN1dGVzIGJsb2Nrcwp9Cg=="}}),e._v(" "),c("p",[c("code",[e._v("PeerStats")]),e._v(" data structure keeps for every peer its current height and a list of pending requests for blocks.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBQZWVyU3RhdHMgc3RydWN0IHsKICBIZWlnaHQgICAgICAgICAgICAgaW50NjQKICBQZW5kaW5nUmVxdWVzdCAgICAgaW50NjQgICAgICAgICAgICAgLy8gYSByZXF1ZXN0IHNlbnQgdG8gdGhpcyBwZWVyCn0K"}}),e._v(" "),c("p",[c("code",[e._v("BlockInfo")]),e._v(" data structure is used to store information (as part of block store) about downloaded blocks: from what peer\na block and the corresponding commit certificate are received.")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"dHlwZSBCbG9ja0luZm8gc3RydWN0IHsKICBCbG9jayAgQmxvY2sKICBDb21taXQgQ29tbWl0CiAgUGVlcklEIElEICAgICAgICAgICAgICAgIC8vIGEgcGVlciBmcm9tIHdoaWNoIHdlIHJlY2VpdmVkIHRoZSBjb3JyZXNwb25kaW5nIEJsb2NrIGFuZCBDb21taXQKfQo="}}),e._v(" "),c("p",[e._v("The "),c("code",[e._v("Controller")]),e._v(" is initialized by providing an initial height ("),c("code",[e._v("startHeight")]),e._v(") from which it will start downloading\nblocks from peers and the current state of the "),c("code",[e._v("BlockExecutor")]),e._v(".")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBOZXdDb250cm9sbGVyU3RhdGUoc3RhcnRIZWlnaHQgaW50NjQsIGV4ZWN1dG9yIEJsb2NrRXhlY3V0b3IpIENvbnRyb2xsZXJTdGF0ZSB7CiAgc3RhdGUgPSBDb250cm9sbGVyU3RhdGUge30KICBzdGF0ZS5IZWlnaHQgPSBzdGFydEhlaWdodAogIHN0YXRlLk1vZGUgPSBNb2RlRmFzdFN5bmMKICBzdGF0ZS5NYXhSZXF1ZXN0UGVuZGluZyA9IHN0YXJ0SGVpZ2h0IC0gMQogIHN0YXRlLlBlbmRpbmdSZXF1ZXN0c051bSA9IDAKICBzdGF0ZS5FeGVjdXRvciA9IGV4ZWN1dG9yCiAgaW5pdGlhbGl6ZSBzdGF0ZS5QZWVyTWFwLCBzdGF0ZS5GYWlsZWRSZXF1ZXN0cyBhbmQgc3RhdGUuU3RvcmUgdG8gZW1wdHkgZGF0YSBzdHJ1Y3R1cmVzCiAgcmV0dXJuIHN0YXRlCn0K"}}),e._v(" "),c("p",[e._v("The core protocol logic is given with the following function:")]),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBoYW5kbGVFdmVudChzdGF0ZSBDb250cm9sbGVyU3RhdGUsIGV2ZW50IEV2ZW50KSAoQ29udHJvbGxlclN0YXRlLCBNZXNzYWdlLCBUaW1lb3V0VHJpZ2dlciwgRXJyb3IpIHsKICBtc2cgPSBuaWwKICB0aW1lb3V0ID0gbmlsCiAgZXJyb3IgPSBuaWwKCiAgc3dpdGNoIHN0YXRlLk1vZGUgewogIGNhc2UgTW9kZUNvbnNlbnN1czoKICAgIHN3aXRjaCBldmVudCA6PSBldmVudC4odHlwZSkgewogICAgY2FzZSBFdmVudEJsb2NrUmVxdWVzdDoKICAgICAgbXNnID0gY3JlYXRlQmxvY2tSZXNwb25zZU1lc3NhZ2Uoc3RhdGUsIGV2ZW50KQogICAgICByZXR1cm4gc3RhdGUsIG1zZywgdGltZW91dCwgZXJyb3IKICAgIGRlZmF1bHQ6CiAgICAgIGVycm9yID0gJnF1b3Q7T25seSByZXNwb25kIHRvIEJsb2NrUmVxdWVzdHMgd2hpbGUgaW4gTW9kZUNvbnNlbnN1cyEmcXVvdDsKICAgICAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCiAgICB9CgogIGNhc2UgTW9kZUZhc3RTeW5jOgogICAgc3dpdGNoIGV2ZW50IDo9IGV2ZW50Lih0eXBlKSB7CiAgICBjYXNlIEV2ZW50QmxvY2tSZXF1ZXN0OgogICAgICBtc2cgPSBjcmVhdGVCbG9ja1Jlc3BvbnNlTWVzc2FnZShzdGF0ZSwgZXZlbnQpCiAgICAgIHJldHVybiBzdGF0ZSwgbXNnLCB0aW1lb3V0LCBlcnJvcgoKICAgIGNhc2UgRXZlbnRTdGF0dXNSZXNwb25zZToKICAgICAgcmV0dXJuIGhhbmRsZUV2ZW50U3RhdHVzUmVzcG9uc2UoZXZlbnQsIHN0YXRlKQoKICAgIGNhc2UgRXZlbnRSZW1vdmVQZWVyOgogICAgICByZXR1cm4gaGFuZGxlRXZlbnRSZW1vdmVQZWVyKGV2ZW50LCBzdGF0ZSkKCiAgICBjYXNlIEV2ZW50QmxvY2tSZXNwb25zZToKICAgICAgcmV0dXJuIGhhbmRsZUV2ZW50QmxvY2tSZXNwb25zZShldmVudCwgc3RhdGUpCgogICAgY2FzZSBFdmVudFJlc3BvbnNlVGltZW91dDoKICAgICAgcmV0dXJuIGhhbmRsZUV2ZW50UmVzcG9uc2VUaW1lb3V0KGV2ZW50LCBzdGF0ZSkKCiAgICBjYXNlIEV2ZW50VGVybWluYXRpb25UaW1lb3V0OgogICAgICAvLyBUZXJtaW5hdGlvbiB0aW1lb3V0IGlzIHRyaWdnZXJlZCBpbiBjYXNlIG9mIGVtcHR5IHBlZXIgc2V0IGFuZCBpbiBjYXNlIHRoZXJlIGFyZSBubyBwZW5kaW5nIHJlcXVlc3RzLgogICAgICAvLyBJZiB0aGlzIHRpbWVvdXQgZXhwaXJlcyBhbmQgaW4gdGhlIG1lYW50aW1lIG5vIG5ldyBwZWVycyBhcmUgYWRkZWQgb3IgbmV3IHBlbmRpbmcgcmVxdWVzdHMgYXJlIG1hZGUKICAgICAgLy8gdGhlbiBgZmFzdC1zeW5jYCBtb2RlIHRlcm1pbmF0ZXMgYnkgc3dpdGNoaW5nIHRvIGBNb2RlQ29uc2Vuc3VzYC4KICAgICAgLy8gTm90ZSB0aGF0IHRlcm1pbmF0aW9uIHRpbWVvdXQgc2hvdWxkIGJlIGhpZ2hlciB0aGFuIHRoZSByZXNwb25zZSB0aW1lb3V0LgogICAgICBpZiBzdGF0ZS5IZWlnaHQgPT0gZXZlbnQuSGVpZ2h0ICZhbXA7JmFtcDsgc3RhdGUuUGVuZGluZ1JlcXVlc3RzTnVtID09IDAgeyBzdGF0ZS5TdGF0ZSA9IENvbnNlbnN1c01vZGUgfQogICAgICByZXR1cm4gc3RhdGUsIG1zZywgdGltZW91dCwgZXJyb3IKCiAgICBkZWZhdWx0OgogICAgICBlcnJvciA9ICZxdW90O1JlY2VpdmVkIHVua25vd24gZXZlbnQgdHlwZSEmcXVvdDsKICAgICAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCiAgICB9CiAgfQp9Cg=="}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBjcmVhdGVCbG9ja1Jlc3BvbnNlTWVzc2FnZShzdGF0ZSBDb250cm9sbGVyU3RhdGUsIGV2ZW50IEJsb2NrUmVxdWVzdCkgTWVzc2FnZVRvU2VuZCB7CiAgbXNnVG9TZW5kID0gbmlsCiAgaWYgXywgb2sgOj0gc3RhdGUuUGVlck1hcFtldmVudC5QZWVySURdOyAhb2sgeyBwZWVyU3RhdHMgPSBQZWVyU3RhdHN7LTEsIC0xfSB9CiAgaWYgc3RhdGUuRXhlY3V0b3IuQ29udGFpbnNCbG9ja1dpdGhIZWlnaHQoZXZlbnQuSGVpZ2h0KSAmYW1wOyZhbXA7IGV2ZW50LkhlaWdodCAmZ3Q7IHBlZXJTdGF0cy5IZWlnaHQgewogICAgcGVlclN0YXRzID0gZXZlbnQuSGVpZ2h0CiAgICBtc2cgPSBCbG9ja1Jlc3BvbnNlTWVzc2FnZXsKICAgICBIZWlnaHQ6ICAgICAgICBldmVudC5IZWlnaHQsCiAgICAgQmxvY2s6ICAgICAgICAgc3RhdGUuRXhlY3V0b3IuZ2V0QmxvY2soZXZlbnRIZWlnaHQpLAogICAgIENvbW1pdDogICAgICAgIHN0YXRlLkV4ZWN1dG9yLmdldENvbW1pdChldmVudEhlaWdodCksCiAgICAgUGVlcklEOiAgICAgICAgZXZlbnQuUGVlcklELAogICAgIEN1cnJlbnRIZWlnaHQ6IHN0YXRlLkhlaWdodCAtIDEsCiAgICB9CiAgICBtc2dUb1NlbmQgPSBNZXNzYWdlVG9TZW5kIHsgZXZlbnQuUGVlcklELCBtc2cgfQogIH0KICBzdGF0ZS5QZWVyTWFwW2V2ZW50LlBlZXJJRF0gPSBwZWVyU3RhdHMKICByZXR1cm4gbXNnVG9TZW5kCn0K"}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBoYW5kbGVFdmVudFN0YXR1c1Jlc3BvbnNlKGV2ZW50IEV2ZW50U3RhdHVzUmVzcG9uc2UsIHN0YXRlIENvbnRyb2xsZXJTdGF0ZSkgKENvbnRyb2xsZXJTdGF0ZSwgTWVzc2FnZVRvU2VuZCwgVGltZW91dFRyaWdnZXIsIEVycm9yKSB7CiAgaWYgXywgb2sgOj0gc3RhdGUuUGVlck1hcFtldmVudC5QZWVySURdOyAhb2sgewogICAgcGVlclN0YXRzID0gUGVlclN0YXRzeyAtMSwgLTEgfQogIH0gZWxzZSB7CiAgICBwZWVyU3RhdHMgPSBzdGF0ZS5QZWVyTWFwW2V2ZW50LlBlZXJJRF0KICB9CgogIGlmIGV2ZW50LkhlaWdodCAmZ3Q7IHBlZXJTdGF0cy5IZWlnaHQgeyBwZWVyU3RhdHMuSGVpZ2h0ID0gZXZlbnQuSGVpZ2h0IH0KICAvLyBpZiB0aGVyZSBhcmUgbm8gcGVuZGluZyByZXF1ZXN0cyBmb3IgdGhpcyBwZWVyLCB0cnkgdG8gc2VuZCBoaW0gYSByZXF1ZXN0IGZvciBibG9jawogIGlmIHBlZXJTdGF0cy5QZW5kaW5nUmVxdWVzdCA9PSAtMSB7CiAgICBtc2cgPSBjcmVhdGVCbG9ja1JlcXVlc3RNZXNzYWdlcyhzdGF0ZSwgZXZlbnQuUGVlcklELCBwZWVyU3RhdHMuSGVpZ2h0KQogICAgLy8gbXNnIGlzIG5pbCBpZiBubyByZXF1ZXN0IGZvciBibG9jayBjYW4gYmUgbWFkZSB0byBhIHBlZXIgYXQgdGhpcyBwb2ludCBpbiB0aW1lCiAgICBpZiBtc2cgIT0gbmlsIHsKICAgICAgcGVlclN0YXRzLlBlbmRpbmdSZXF1ZXN0cyA9IG1zZy5IZWlnaHQKICAgICAgc3RhdGUuUGVuZGluZ1JlcXVlc3RzTnVtKysKICAgICAgLy8gd2hlbiBhIHJlcXVlc3QgZm9yIGEgYmxvY2sgaXMgc2VudCB0byBhIHBlZXIsIGEgcmVzcG9uc2UgdGltZW91dCBpcyB0cmlnZ2VyZWQuIElmIG5vIGNvcnJlc3BvbmRpbmcgYmxvY2sgaXMgc2VudCBieSB0aGUgcGVlcgogICAgICAvLyBkdXJpbmcgcmVzcG9uc2UgdGltZW91dCBwZXJpb2QsIHRoZW4gdGhlIHBlZXIgaXMgY29uc2lkZXJlZCBmYXVsdHkgYW5kIGlzIHJlbW92ZWQgZnJvbSB0aGUgcGVlciBzZXQuCiAgICAgIHRpbWVvdXQgPSBSZXNwb25zZVRpbWVvdXRUcmlnZ2VyeyBtc2cuUGVlcklELCBtc2cuSGVpZ2h0LCBQZWVyVGltZW91dCB9CiAgICB9IGVsc2UgaWYgc3RhdGUuUGVuZGluZ1JlcXVlc3RzTnVtID09IDAgewogICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcGVuZGluZyByZXF1ZXN0cyBhbmQgbm8gbmV3IHJlcXVlc3QgY2FuIGJlIHBsYWNlZCB0byB0aGUgcGVlciwgdGVybWluYXRpb24gdGltZW91dCBpcyB0cmlnZ2VyZWQuCiAgICAgIC8vIElmIHRlcm1pbmF0aW9uIHRpbWVvdXQgZXhwaXJlcyBhbmQgd2UgYXJlIHN0aWxsIGF0IHRoZSBzYW1lIGhlaWdodCBhbmQgdGhlcmUgYXJlIG5vIHBlbmRpbmcgcmVxdWVzdHMsIHRoZSAmcXVvdDtmYXN0LXN5bmMmcXVvdDsKICAgICAgLy8gbW9kZSBpcyBmaW5pc2hlZCBhbmQgd2Ugc3dpdGNoIHRvIGBNb2RlQ29uc2Vuc3VzYC4KICAgICAgdGltZW91dCA9IFRlcm1pbmF0aW9uVGltZW91dFRyaWdnZXJ7IHN0YXRlLkhlaWdodCwgVGVybWluYXRpb25UaW1lb3V0IH0KICAgIH0KICB9CiAgc3RhdGUuUGVlck1hcFtldmVudC5QZWVySURdID0gcGVlclN0YXRzCiAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCn0K"}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBoYW5kbGVFdmVudFJlbW92ZVBlZXIoZXZlbnQgRXZlbnRSZW1vdmVQZWVyLCBzdGF0ZSBDb250cm9sbGVyU3RhdGUpIChDb250cm9sbGVyU3RhdGUsIE1lc3NhZ2VUb1NlbmQsIFRpbWVvdXRUcmlnZ2VyLCBFcnJvcikgewogIGlmIF8sIG9rIDo9IHN0YXRlLlBlZXJNYXBbZXZlbnQuUGVlcklEXTsgb2sgewogICAgcGVuZGluZ1JlcXVlc3QgPSBzdGF0ZS5QZWVyTWFwW2V2ZW50LlBlZXJJRF0uUGVuZGluZ1JlcXVlc3QKICAgIC8vIGlmIGEgcGVlciBpcyByZW1vdmVkIGZyb20gdGhlIHBlZXIgc2V0LCBpdHMgcGVuZGluZyByZXF1ZXN0IGlzIGRlY2xhcmVkIGZhaWxlZCBhbmQgYWRkZWQgdG8gdGhlIGBGYWlsZWRSZXF1ZXN0c2AgbGlzdAogICAgLy8gc28gaXQgY2FuIGJlIHJldHJpZWQuCiAgICBpZiBwZW5kaW5nUmVxdWVzdCAhPSAtMSB7CiAgICAgIGFkZChzdGF0ZS5GYWlsZWRSZXF1ZXN0cywgcGVuZGluZ1JlcXVlc3QpCiAgICB9CiAgICBzdGF0ZS5QZW5kaW5nUmVxdWVzdHNOdW0tLQogICAgZGVsZXRlKHN0YXRlLlBlZXJNYXAsIGV2ZW50LlBlZXJJRCkKICAgIC8vIGlmIHRoZSBwZWVyIHNldCBpcyBlbXB0eSBhZnRlciByZW1vdmFsIG9mIHRoaXMgcGVlciB0aGVuIHRlcm1pbmF0aW9uIHRpbWVvdXQgaXMgdHJpZ2dlcmVkLgogICAgaWYgc3RhdGUuUGVlck1hcC5pc0VtcHR5KCkgewogICAgICB0aW1lb3V0ID0gVGVybWluYXRpb25UaW1lb3V0VHJpZ2dlcnsgc3RhdGUuSGVpZ2h0LCBUZXJtaW5hdGlvblRpbWVvdXQgfQogICAgfQogIH0gZWxzZSB7IGVycm9yID0gJnF1b3Q7UmVtb3ZpbmcgdW5rbm93biBwZWVyISZxdW90OyB9CiAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCg=="}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBoYW5kbGVFdmVudEJsb2NrUmVzcG9uc2UoZXZlbnQgRXZlbnRCbG9ja1Jlc3BvbnNlLCBzdGF0ZSBDb250cm9sbGVyU3RhdGUpIChDb250cm9sbGVyU3RhdGUsIE1lc3NhZ2VUb1NlbmQsIFRpbWVvdXRUcmlnZ2VyLCBFcnJvcikKICBpZiBzdGF0ZS5QZWVyTWFwW2V2ZW50LlBlZXJJRF0gewogICAgcGVlclN0YXRzID0gc3RhdGUuUGVlck1hcFtldmVudC5QZWVySURdCiAgICAvLyB3aGVuIGV4cGVjdGVkIGJsb2NrIGFycml2ZXMgZnJvbSBhIHBlZXIsIGl0IGlzIGFkZGVkIHRvIHRoZSBzdG9yZSBzbyBpdCBjYW4gYmUgdmVyaWZpZWQgYW5kIGlmIGNvcnJlY3QgZXhlY3V0ZWQgYWZ0ZXIuCiAgICBpZiBwZWVyU3RhdHMuUGVuZGluZ1JlcXVlc3QgPT0gZXZlbnQuSGVpZ2h0IHsKICAgICAgcGVlclN0YXRzLlBlbmRpbmdSZXF1ZXN0ID0gLTEKICAgICAgc3RhdGUuUGVuZGluZ1JlcXVlc3RzTnVtLS0KICAgICAgaWYgZXZlbnQuUGVlckhlaWdodCAmZ3Q7IHBlZXJTdGF0cy5IZWlnaHQgeyBwZWVyU3RhdHMuSGVpZ2h0ID0gZXZlbnQuUGVlckhlaWdodCB9CiAgICAgIHN0YXRlLlN0b3JlW2V2ZW50LkhlaWdodF0gPSBCbG9ja0luZm97IGV2ZW50LkJsb2NrLCBldmVudC5Db21taXQsIGV2ZW50LlBlZXJJRCB9CiAgICAgIC8vIGJsb2NrcyBhcmUgdmVyaWZpZWQgc2VxdWVudGlhbGx5IHNvIGFkZGluZyBhIGJsb2NrIHRvIHRoZSBzdG9yZSBkb2VzIG5vdCBtZWFuIHRoYXQgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSB2ZXJpZmllZAogICAgICAvLyBhcyBzb21lIG9mIHRoZSBwcmV2aW91cyBibG9ja3MgbWlnaHQgYmUgbWlzc2luZy4KICAgICAgc3RhdGUgPSB2ZXJpZnlCbG9ja3Moc3RhdGUpIC8vIGl0IGNhbiBsZWFkIHRvIGV2ZW50LlBlZXJJRCBiZWluZyByZW1vdmVkIGZyb20gcGVlciBsaXN0CiAgICAgIGlmIF8sIG9rIDo9IHN0YXRlLlBlZXJNYXBbZXZlbnQuUGVlcklEXTsgb2sgewogICAgICAgIC8vIHdlIHRyeSB0byBpZGVudGlmeSBuZXcgcmVxdWVzdCBmb3IgYSBibG9jayB0aGF0IGNhbiBiZSBhc2tlZCB0byB0aGUgcGVlcgogICAgICAgIG1zZyA9IGNyZWF0ZUJsb2NrUmVxdWVzdE1lc3NhZ2Uoc3RhdGUsIGV2ZW50LlBlZXJJRCwgcGVlclN0YXRzLkhlaWdodCkKICAgICAgICBpZiBtc2cgIT0gbmlsIHsKICAgICAgICAgIHBlZXJTdGF0cy5QZW5kaW5nUmVxdWVzdHMgPSBtc2cuSGVpZ2h0CiAgICAgICAgICBzdGF0ZS5QZW5kaW5nUmVxdWVzdHNOdW0rKwogICAgICAgICAgLy8gaWYgcmVxdWVzdCBmb3IgYmxvY2sgaXMgbWFkZSwgcmVzcG9uc2UgdGltZW91dCBpcyB0cmlnZ2VyZWQKICAgICAgICAgIHRpbWVvdXQgPSBSZXNwb25zZVRpbWVvdXRUcmlnZ2VyeyBtc2cuUGVlcklELCBtc2cuSGVpZ2h0LCBQZWVyVGltZW91dCB9CiAgICAgICAgfSBlbHNlIGlmIHN0YXRlLlBlZXJNYXAuaXNFbXB0eSgpIHx8IHN0YXRlLlBlbmRpbmdSZXF1ZXN0c051bSA9PSAwIHsKICAgICAgICAgIC8vIGlmIHRoZSBwZWVyIG1hcCBpcyBlbXB0eSAodGhlIHBlZXIgY2FuIGJlIHJlbW92ZWQgYXMgYmxvY2sgdmVyaWZpY2F0aW9uIGZhaWxlZCkgb3IgdGhlcmUgYXJlIG5vIHBlbmRpbmcgcmVxdWVzdHMKICAgICAgICAgIC8vIHRlcm1pbmF0aW9uIHRpbWVvdXQgaXMgdHJpZ2dlcmVkLgogICAgICAgICAgIHRpbWVvdXQgPSBUZXJtaW5hdGlvblRpbWVvdXRUcmlnZ2VyeyBzdGF0ZS5IZWlnaHQsIFRlcm1pbmF0aW9uVGltZW91dCB9CiAgICAgICAgfQogICAgICB9CiAgICB9IGVsc2UgeyBlcnJvciA9ICZxdW90O1JlY2VpdmVkIEJsb2NrIGZyb20gd3JvbmcgcGVlciEmcXVvdDsgfQogIH0gZWxzZSB7IGVycm9yID0gJnF1b3Q7UmVjZWl2ZWQgQmxvY2sgZnJvbSB1bmtub3duIHBlZXIhJnF1b3Q7IH0KCiAgc3RhdGUuUGVlck1hcFtldmVudC5QZWVySURdID0gcGVlclN0YXRzCiAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCn0K"}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBoYW5kbGVFdmVudFJlc3BvbnNlVGltZW91dChldmVudCwgc3RhdGUpIHsKICBpZiBfLCBvayA6PSBzdGF0ZS5QZWVyTWFwW2V2ZW50LlBlZXJJRF07IG9rIHsKICAgIHBlZXJTdGF0cyA9IHN0YXRlLlBlZXJNYXBbZXZlbnQuUGVlcklEXQogICAgLy8gaWYgYSByZXNwb25zZSB0aW1lb3V0IGV4cGlyZXMgYW5kIHRoZSBwZWVyIGhhc24ndCBkZWxpdmVyZWQgdGhlIGJsb2NrLCB0aGUgcGVlciBpcyByZW1vdmVkIGZyb20gdGhlIHBlZXIgbGlzdCBhbmQKICAgIC8vIHRoZSByZXF1ZXN0IGlzIGFkZGVkIHRvIHRoZSBgRmFpbGVkUmVxdWVzdHNgIHNvIHRoZSBibG9jayBjYW4gYmUgZG93bmxvYWRlZCBmcm9tIG90aGVyIHBlZXIKICBpZiBwZWVyU3RhdHMuUGVuZGluZ1JlcXVlc3QgPT0gZXZlbnQuSGVpZ2h0IHsKICAgIGFkZChzdGF0ZS5GYWlsZWRSZXF1ZXN0cywgcGVuZGluZ1JlcXVlc3QpCiAgICBkZWxldGUoc3RhdGUuUGVlck1hcCwgZXZlbnQuUGVlcklEKQogICAgc3RhdGUuUGVuZGluZ1JlcXVlc3RzTnVtLS0KICAgIC8vIGlmIHBlZXIgc2V0IGlzIGVtcHR5LCB0aGVuIHRlcm1pbmF0aW9uIHRpbWVvdXQgaXMgdHJpZ2dlcmVkCiAgICBpZiBzdGF0ZS5QZWVyTWFwLmlzRW1wdHkoKSB7CiAgICAgIHRpbWVvdXQgPSBUaW1lb3V0VHJpZ2dlcnsgc3RhdGUuSGVpZ2h0LCBUZXJtaW5hdGlvblRpbWVvdXQgfQogICAgfQogIH0KICB9CiAgcmV0dXJuIHN0YXRlLCBtc2csIHRpbWVvdXQsIGVycm9yCn0K"}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyBjcmVhdGVCbG9ja1JlcXVlc3RNZXNzYWdlKHN0YXRlIENvbnRyb2xsZXJTdGF0ZSwgcGVlcklEIElELCBwZWVySGVpZ2h0IGludDY0KSBNZXNzYWdlVG9TZW5kIHsKICBtc2cgPSBuaWwKICBibG9ja0hlaWdodCA9IC0xCiAgciA9IGZpbmQgcmVxdWVzdCBpbiBzdGF0ZS5GYWlsZWRSZXF1ZXN0cyBzdWNoIHRoYXQgciAmbHQ7PSBwZWVySGVpZ2h0IC8vIHJldHVybnMgYG5pbGAgaWYgdGhlcmUgYXJlIG5vIHN1Y2ggcmVxdWVzdAogIC8vIGlmIHRoZXJlIGlzIGEgaGVpZ2h0IGluIGZhaWxlZCByZXF1ZXN0cyB0aGF0IGNhbiBiZSBkb3dubG9hZGVkIGZyb20gdGhlIHBlZXIgc2VuZCByZXF1ZXN0IHRvIGl0CiAgaWYgciAhPSBuaWwgewogICAgYmxvY2tOdW1iZXIgPSByCiAgICBkZWxldGUoc3RhdGUuRmFpbGVkUmVxdWVzdHMsIHIpCiAgfSBlbHNlIGlmIHN0YXRlLk1heFJlcXVlc3RQZW5kaW5nICZsdDsgcGVlckhlaWdodCB7CiAgLy8gaWYgaGVpZ2h0IG9mIHRoZSBtYXhpbXVtIHBlbmRpbmcgcmVxdWVzdCBpcyBzbWFsbGVyIHRoYW4gcGVlciBoZWlnaHQsIHRoZW4gYXNrIHBlZXIgZm9yIG5leHQgYmxvY2sKICAgIHN0YXRlLk1heFJlcXVlc3RQZW5kaW5nKysKICAgIGJsb2NrSGVpZ2h0ID0gc3RhdGUuTWF4UmVxdWVzdFBlbmRpbmcgLy8gaW5jcmVtZW50IHN0YXRlLk1heFJlcXVlc3RQZW5kaW5nIGFuZCB0aGVuIHJldHVybiB0aGUgbmV3IHZhbHVlCiAgfQoKICBpZiBibG9ja0hlaWdodCAmZ3Q7IC0xIHsgbXNnID0gTWVzc2FnZVRvU2VuZCB7IHBlZXJJRCwgTWVzc2FnZUJsb2NrUmVxdWVzdCB7IGJsb2NrSGVpZ2h0IH0gfQogIHJldHVybiBtc2cKfQo="}}),e._v(" "),c("tm-code-block",{staticClass:"codeblock",attrs:{language:" go",base64:"ZnVuYyB2ZXJpZnlCbG9ja3Moc3RhdGUgU3RhdGUpIFN0YXRlIHsKICBkb25lID0gZmFsc2UKICBmb3IgIWRvbmUgewogICAgYmxvY2sgPSBzdGF0ZS5TdG9yZVtoZWlnaHRdCiAgICBpZiBibG9jayAhPSBuaWwgewogICAgICB2ZXJpZmllZCA9IHZlcmlmeSBibG9jay5CbG9jayB1c2luZyBibG9jay5Db21taXQgLy8gcmV0dXJuIGB0cnVlYCBpcyB2ZXJpZmljYXRpb24gc3VjY2VlZCwgJ2ZhbHNlYCBvdGhlcndpc2UKCiAgICAgIGlmIHZlcmlmaWVkIHsKICAgICAgICBibG9jay5FeGVjdXRlKCkgICAvLyBleGVjdXRpbmcgYmxvY2sgaXMgY29zdGx5IG9wZXJhdGlvbiBzbyBpdCBtaWdodCBtYWtlIHNlbnNlIGV4ZWN1dGluZyBhc3luY2hyb25vdXNseQogICAgICAgIHN0YXRlLkhlaWdodCsrCiAgICAgIH0gZWxzZSB7CiAgICAgICAgLy8gaWYgYmxvY2sgdmVyaWZpY2F0aW9uIGZhaWxlZCwgdGhlbiBpdCBpcyBhZGRlZCB0byBgRmFpbGVkUmVxdWVzdHNgIGFuZCB0aGUgcGVlciBpcyByZW1vdmVkIGZyb20gdGhlIHBlZXIgc2V0CiAgICAgICAgYWRkKHN0YXRlLkZhaWxlZFJlcXVlc3RzLCBoZWlnaHQpCiAgICAgICAgc3RhdGUuU3RvcmVbaGVpZ2h0XSA9IG5pbAogICAgICAgIGlmIF8sIG9rIDo9IHN0YXRlLlBlZXJNYXBbYmxvY2suUGVlcklEXTsgb2sgewogICAgICAgICAgcGVuZGluZ1JlcXVlc3QgPSBzdGF0ZS5QZWVyTWFwW2Jsb2NrLlBlZXJJRF0uUGVuZGluZ1JlcXVlc3QKICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcGVuZGluZyByZXF1ZXN0IHNlbnQgdG8gdGhlIHBlZXIgdGhhdCBpcyBqdXN0IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGUgcGVlciBzZXQsIGFkZCBpdCB0byBgRmFpbGVkUmVxdWVzdHNgCiAgICAgICAgICBpZiBwZW5kaW5nUmVxdWVzdCAhPSAtMSB7CiAgICAgICAgICAgIGFkZChzdGF0ZS5GYWlsZWRSZXF1ZXN0cywgcGVuZGluZ1JlcXVlc3QpCiAgICAgICAgICAgIHN0YXRlLlBlbmRpbmdSZXF1ZXN0c051bS0tCiAgICAgICAgICB9CiAgICAgICAgICBkZWxldGUoc3RhdGUuUGVlck1hcCwgZXZlbnQuUGVlcklEKQogICAgICAgIH0KICAgICAgICBkb25lID0gdHJ1ZQogICAgICB9CiAgICB9IGVsc2UgeyBkb25lID0gdHJ1ZSB9CiAgfQogIHJldHVybiBzdGF0ZQp9Cg=="}}),e._v(" "),c("p",[e._v("In the proposed architecture "),c("code",[e._v("Controller")]),e._v(" is not active task, i.e., it is being called by the "),c("code",[e._v("Executor")]),e._v(". Depending on\nthe return values returned by "),c("code",[e._v("Controller")]),e._v(","),c("code",[e._v("Executor")]),e._v(" will send a message to some peer ("),c("code",[e._v("msg")]),e._v(" != nil), trigger a\ntimeout ("),c("code",[e._v("timeout")]),e._v(" != nil) or deal with errors ("),c("code",[e._v("error")]),e._v(" != nil).\nIn case a timeout is triggered, it will provide as an input to "),c("code",[e._v("Controller")]),e._v(" the corresponding timeout event once\ntimeout expires.")]),e._v(" "),c("h2",{attrs:{id:"status"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),c("p",[e._v("Draft.")]),e._v(" "),c("h2",{attrs:{id:"consequences"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),c("h3",{attrs:{id:"positive"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),c("ul",[c("li",[e._v("isolated implementation of the algorithm")]),e._v(" "),c("li",[e._v("improved testability - simpler to prove correctness")]),e._v(" "),c("li",[e._v("clearer separation of concerns - easier to reason")])]),e._v(" "),c("h3",{attrs:{id:"negative"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),c("h3",{attrs:{id:"neutral"}},[c("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")])],1)}),[],!1,null,null,null);l.default=t.exports}}]);