const fortuneCookies = [
    "Monk.",
    "Rogue",
    "Warlock",
    "Mage",
    "Warrior",
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx]
}

//The important thing to note here is the use of the global variable exports. If you want something to be visible outside of the module, you have to add it to exports. In this example, the function getFortune will be available from outside this module, but our array fortuneCookies will be completely hidden. This is a good thing: encapsulation allows for less error-prone and fragile code.

// const fortuneCookies = [
//     "Conquer your fears or they will conquer you.",
//     "Rivers need springs.",
//     "Do not fear what you don't know.",
//     "You will have a pleasant surprise.",
//     "Whenever possible, keep it simple.",
//   ]
//   exports.getFortune = () => {
//     const idx = Math.floor(Math.random()*fortuneCookies.length)
//     return fortuneCookies[idx]
//   }