export type GoldDigger = {
  version: "0.1.0"
  name: "gold_digger"
  instructions: [
    {
      name: "initialize"
      accounts: [
        {
          name: "goldDiggerState"
          isMut: true
          isSigner: false
        },
        {
          name: "authority"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "stakeNft"
      accounts: [
        {
          name: "goldDiggerState"
          isMut: true
          isSigner: false
        },
        {
          name: "stakingAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "nftMint"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "unstakeNft"
      accounts: [
        {
          name: "goldDiggerState"
          isMut: true
          isSigner: false
        },
        {
          name: "stakingAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "nftMint"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "claimRewards"
      accounts: [
        {
          name: "goldDiggerState"
          isMut: true
          isSigner: false
        },
        {
          name: "stakingAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "nftMint"
          isMut: false
          isSigner: false
        },
        {
          name: "owner"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: "goldDiggerState"
      type: {
        kind: "struct"
        fields: [
          {
            name: "authority"
            type: "publicKey"
          },
          {
            name: "totalStaked"
            type: "u64"
          },
          {
            name: "totalRewardsDistributed"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "stakingAccount"
      type: {
        kind: "struct"
        fields: [
          {
            name: "owner"
            type: "publicKey"
          },
          {
            name: "nftMint"
            type: "publicKey"
          },
          {
            name: "stakeTime"
            type: "i64"
          },
          {
            name: "lastClaimTime"
            type: "i64"
          },
          {
            name: "isStaked"
            type: "bool"
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: "NotStaked"
      msg: "NFT is not staked"
    },
    {
      code: 6001
      name: "NotOwner"
      msg: "Not the owner of the staked NFT"
    },
  ]
}

export const IDL: GoldDigger = {
  version: "0.1.0",
  name: "gold_digger",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "goldDiggerState",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "stakeNft",
      accounts: [
        {
          name: "goldDiggerState",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "unstakeNft",
      accounts: [
        {
          name: "goldDiggerState",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claimRewards",
      accounts: [
        {
          name: "goldDiggerState",
          isMut: true,
          isSigner: false,
        },
        {
          name: "stakingAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nftMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "goldDiggerState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "totalStaked",
            type: "u64",
          },
          {
            name: "totalRewardsDistributed",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "stakingAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "nftMint",
            type: "publicKey",
          },
          {
            name: "stakeTime",
            type: "i64",
          },
          {
            name: "lastClaimTime",
            type: "i64",
          },
          {
            name: "isStaked",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NotStaked",
      msg: "NFT is not staked",
    },
    {
      code: 6001,
      name: "NotOwner",
      msg: "Not the owner of the staked NFT",
    },
  ],
}
