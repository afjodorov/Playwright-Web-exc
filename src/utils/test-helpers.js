class TestHelpers {
    static generateRandStr(length) {
        var result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var counter = 0;

        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * length));
            counter += 1;
        }
        
        return result;
    }

    static generateTestEmail(length) {
        return "test" + this.generateRandStr(length) + "@test.com";
    }
}

module.exports = TestHelpers; 