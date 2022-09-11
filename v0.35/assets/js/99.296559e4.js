(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{694:function(e,t,a){"use strict";a.r(t);var o=a(1),l=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"adr-029-check-block-txs-before-prevote"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adr-029-check-block-txs-before-prevote"}},[e._v("#")]),e._v(" ADR 029: Check block txs before prevote")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("p",[e._v("04-10-2018: Update with link to issue\n"),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/2384",target:"_blank",rel:"noopener noreferrer"}},[e._v("#2384"),a("OutboundLink")],1),e._v(" and reason for rejection\n19-09-2018: Initial Draft")]),e._v(" "),a("h2",{attrs:{id:"context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),a("p",[e._v("We currently check a tx's validity through 2 ways.")]),e._v(" "),a("ol",[a("li",[e._v("Through checkTx in mempool connection.")]),e._v(" "),a("li",[e._v("Through deliverTx in consensus connection.")])]),e._v(" "),a("p",[e._v("The 1st is called when external tx comes in, so the node should be a proposer this time. The 2nd is called when external block comes in and reach the commit phase, the node doesn't need to be the proposer of the block, however it should check the txs in that block.")]),e._v(" "),a("p",[e._v("In the 2nd situation, if there are many invalid txs in the block, it would be too late for all nodes to discover that most txs in the block are invalid, and we'd better not record invalid txs in the blockchain too.")]),e._v(" "),a("h2",{attrs:{id:"proposed-solution"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#proposed-solution"}},[e._v("#")]),e._v(" Proposed solution")]),e._v(" "),a("p",[e._v("Therefore, we should find a way to check the txs' validity before send out a prevote. Currently we have cs.isProposalComplete() to judge whether a block is complete. We can have")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"ZnVuYyAoYmxvY2tFeGVjICpCbG9ja0V4ZWN1dG9yKSBDaGVja0Jsb2NrKGJsb2NrICp0eXBlcy5CbG9jaykgZXJyb3IgewogICAvLyBjaGVjayB0eHMgb2YgYmxvY2suCiAgIGZvciBfLCB0eCA6PSByYW5nZSBibG9jay5UeHMgewogICAgICByZXFSZXMgOj0gYmxvY2tFeGVjLnByb3h5QXBwLkNoZWNrVHhBc3luYyh0eCkKICAgICAgcmVxUmVzLldhaXQoKQogICAgICBpZiByZXFSZXMuUmVzcG9uc2UgPT0gbmlsIHx8IHJlcVJlcy5SZXNwb25zZS5HZXRDaGVja1R4KCkgPT0gbmlsIHx8IHJlcVJlcy5SZXNwb25zZS5HZXRDaGVja1R4KCkuQ29kZSAhPSBhYmNpLkNvZGVUeXBlT0sgewogICAgICAgICByZXR1cm4gZXJyb3JzLkVycm9yZigmcXVvdDt0eCAldiBjaGVjayBmYWlsZWQuIHJlc3BvbnNlOiAldiZxdW90OywgdHgsIHJlcVJlcy5SZXNwb25zZSkKICAgICAgfQogICB9CiAgIHJldHVybiBuaWwKfQo="}}),e._v(" "),a("p",[e._v("such a method in BlockExecutor to check all txs' validity in that block.")]),e._v(" "),a("p",[e._v("However, this method should not be implemented like that, because checkTx will share the same state used in mempool in the app.  So we should define a new interface method checkBlock in Application to indicate it to use the same state as deliverTx.")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"dHlwZSBBcHBsaWNhdGlvbiBpbnRlcmZhY2UgewogICAvLyBJbmZvL1F1ZXJ5IENvbm5lY3Rpb24KICAgSW5mbyhSZXF1ZXN0SW5mbykgUmVzcG9uc2VJbmZvICAgICAgICAgICAgICAgIC8vIFJldHVybiBhcHBsaWNhdGlvbiBpbmZvCiAgIFNldE9wdGlvbihSZXF1ZXN0U2V0T3B0aW9uKSBSZXNwb25zZVNldE9wdGlvbiAvLyBTZXQgYXBwbGljYXRpb24gb3B0aW9uCiAgIFF1ZXJ5KFJlcXVlc3RRdWVyeSkgUmVzcG9uc2VRdWVyeSAgICAgICAgICAgICAvLyBRdWVyeSBmb3Igc3RhdGUKCiAgIC8vIE1lbXBvb2wgQ29ubmVjdGlvbgogICBDaGVja1R4KHR4IFtdYnl0ZSkgUmVzcG9uc2VDaGVja1R4IC8vIFZhbGlkYXRlIGEgdHggZm9yIHRoZSBtZW1wb29sCgogICAvLyBDb25zZW5zdXMgQ29ubmVjdGlvbgogICBJbml0Q2hhaW4oUmVxdWVzdEluaXRDaGFpbikgUmVzcG9uc2VJbml0Q2hhaW4gLy8gSW5pdGlhbGl6ZSBibG9ja2NoYWluIHdpdGggdmFsaWRhdG9ycyBhbmQgb3RoZXIgaW5mbyBmcm9tIFRlbmRlcm1pbnRDb3JlCiAgIENoZWNrQmxvY2soUmVxdWVzdENoZWNrQmxvY2spIFJlc3BvbnNlQ2hlY2tCbG9jawogICBCZWdpbkJsb2NrKFJlcXVlc3RCZWdpbkJsb2NrKSBSZXNwb25zZUJlZ2luQmxvY2sgLy8gU2lnbmFscyB0aGUgYmVnaW5uaW5nIG9mIGEgYmxvY2sKICAgRGVsaXZlclR4KHR4IFtdYnl0ZSkgUmVzcG9uc2VEZWxpdmVyVHggICAgICAgICAgIC8vIERlbGl2ZXIgYSB0eCBmb3IgZnVsbCBwcm9jZXNzaW5nCiAgIEVuZEJsb2NrKFJlcXVlc3RFbmRCbG9jaykgUmVzcG9uc2VFbmRCbG9jayAgICAgICAvLyBTaWduYWxzIHRoZSBlbmQgb2YgYSBibG9jaywgcmV0dXJucyBjaGFuZ2VzIHRvIHRoZSB2YWxpZGF0b3Igc2V0CiAgIENvbW1pdCgpIFJlc3BvbnNlQ29tbWl0ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21taXQgdGhlIHN0YXRlIGFuZCByZXR1cm4gdGhlIGFwcGxpY2F0aW9uIE1lcmtsZSByb290IGhhc2gKfQo="}}),e._v(" "),a("p",[e._v("All app should implement that method. For example, counter:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"ZnVuYyAoYXBwICpDb3VudGVyQXBwbGljYXRpb24pIENoZWNrQmxvY2soYmxvY2sgdHlwZXMuUmVxdWVzdF9DaGVja0Jsb2NrKSB0eXBlcy5SZXNwb25zZUNoZWNrQmxvY2sgewogICBpZiBhcHAuc2VyaWFsIHsKICAgCSAgYXBwLm9yaWdpbmFsVHhDb3VudCA9IGFwcC50eENvdW50ICAgLy9iYWNrdXAgdGhlIHR4Q291bnQgc3RhdGUKICAgICAgZm9yIF8sIHR4IDo9IHJhbmdlIGJsb2NrLkNoZWNrQmxvY2suQmxvY2suVHhzIHsKICAgICAgICAgaWYgbGVuKHR4KSAmZ3Q7IDggewogICAgICAgICAgICByZXR1cm4gdHlwZXMuUmVzcG9uc2VDaGVja0Jsb2NrewogICAgICAgICAgICAgICBDb2RlOiBjb2RlLkNvZGVUeXBlRW5jb2RpbmdFcnJvciwKICAgICAgICAgICAgICAgTG9nOiAgZm10LlNwcmludGYoJnF1b3Q7TWF4IHR4IHNpemUgaXMgOCBieXRlcywgZ290ICVkJnF1b3Q7LCBsZW4odHgpKX0KICAgICAgICAgfQogICAgICAgICB0eDggOj0gbWFrZShbXWJ5dGUsIDgpCiAgICAgICAgIGNvcHkodHg4W2xlbih0eDgpLWxlbih0eCk6XSwgdHgpCiAgICAgICAgIHR4VmFsdWUgOj0gYmluYXJ5LkJpZ0VuZGlhbi5VaW50NjQodHg4KQogICAgICAgICBpZiB0eFZhbHVlICZsdDsgdWludDY0KGFwcC50eENvdW50KSB7CiAgICAgICAgICAgIHJldHVybiB0eXBlcy5SZXNwb25zZUNoZWNrQmxvY2t7CiAgICAgICAgICAgICAgIENvZGU6IGNvZGUuQ29kZVR5cGVCYWROb25jZSwKICAgICAgICAgICAgICAgTG9nOiAgZm10LlNwcmludGYoJnF1b3Q7SW52YWxpZCBub25jZS4gRXhwZWN0ZWQgJmd0Oz0gJXYsIGdvdCAldiZxdW90OywgYXBwLnR4Q291bnQsIHR4VmFsdWUpfQogICAgICAgICB9CiAgICAgICAgIGFwcC50eENvdW50KysKICAgICAgfQogICB9CiAgIHJldHVybiB0eXBlcy5SZXNwb25zZUNoZWNrQmxvY2t7Q29kZTogY29kZS5Db2RlVHlwZU9LfQp9Cg=="}}),e._v(" "),a("p",[e._v("In BeginBlock, the app should restore the state to the orignal state before checking the block:")]),e._v(" "),a("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"ZnVuYyAoYXBwICpDb3VudGVyQXBwbGljYXRpb24pIERlbGl2ZXJUeCh0eCBbXWJ5dGUpIHR5cGVzLlJlc3BvbnNlRGVsaXZlclR4IHsKICAgaWYgYXBwLnNlcmlhbCB7CiAgICAgIGFwcC50eENvdW50ID0gYXBwLm9yaWdpbmFsVHhDb3VudCAgIC8vcmVzdG9yZSB0aGUgdHhDb3VudCBzdGF0ZQogICB9CiAgIGFwcC50eENvdW50KysKICAgcmV0dXJuIHR5cGVzLlJlc3BvbnNlRGVsaXZlclR4e0NvZGU6IGNvZGUuQ29kZVR5cGVPS30KfQo="}}),e._v(" "),a("p",[e._v("The txCount is like the nonce in ethermint, it should be restored when entering the deliverTx phase. While some operation like checking the tx signature needs not to be done again. So the deliverTx can focus on how a tx can be applied, ignoring the checking of the tx, because all the checking has already been done in the checkBlock phase before.")]),e._v(" "),a("p",[e._v("An optional optimization is alter the deliverTx to deliverBlock. For the block has already been checked by checkBlock, so all the txs in it are valid. So the app can cache the block, and in the deliverBlock phase, it just needs to apply the block in the cache. This optimization can save network current in deliverTx.")]),e._v(" "),a("h2",{attrs:{id:"status"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),a("p",[e._v("Rejected")]),e._v(" "),a("h2",{attrs:{id:"decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),a("p",[e._v("Performance impact is considered too great. See "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/2384",target:"_blank",rel:"noopener noreferrer"}},[e._v("#2384"),a("OutboundLink")],1)]),e._v(" "),a("h2",{attrs:{id:"consequences"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),a("h3",{attrs:{id:"positive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),a("ul",[a("li",[e._v("more robust to defend the adversary to propose a block full of invalid txs.")])]),e._v(" "),a("h3",{attrs:{id:"negative"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),a("ul",[a("li",[e._v("add a new interface method. app logic needs to adjust to appeal to it.")]),e._v(" "),a("li",[e._v("sending all the tx data over the ABCI twice")]),e._v(" "),a("li",[e._v("potentially redundant validations (eg. signature checks in both CheckBlock and\nDeliverTx)")])]),e._v(" "),a("h3",{attrs:{id:"neutral"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")])],1)}),[],!1,null,null,null);t.default=l.exports}}]);