def getGitChanges() {
    if(currentBuild.changeSets.size() > 0) {
        return true
    }
    else {
        return false
    }
}

return this