var _workspace = [
    {
        text: "My Strategies",
        url:"showApplication.do",
    },
    {
        text: "Upload Genes",
        route: "showQuestion.do?questionFullName=GeneQuestions.GeneUpload",
    }
];

var _about = [
    {
        text: "Public Strategies",
        url: "showApplication.do?tab=public_strat"
    },
    {
        text: "News",
        url: "showXmlDataContent.do?name=XmlQuestions.News"
    },
    {
        text: "Documentation",
        url: "showXmlDataContent.do?name=XmlQuestions.Documentation"
    },
    {
        text: "Contact Us",
        route: "/contact-us"
    }
];




// public strategies news documentation contact us
export {_workspace, _about};