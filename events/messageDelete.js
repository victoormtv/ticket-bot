const fs = require('fs');
const path = require('path');

const salesFilePath = path.join(__dirname, '../data/sales.json');

function loadSales() {
    if (!fs.existsSync(salesFilePath)) {
        return [];
    }
    const data = fs.readFileSync(salesFilePath, 'utf-8');
    return JSON.parse(data);
}

function deleteSaleByMessageId(messageId) {
    const sales = loadSales();
    const index = sales.findIndex(v => v.messageId === messageId);
    
    if (index !== -1) {
        sales.splice(index, 1);
        fs.writeFileSync(salesFilePath, JSON.stringify(sales, null, 2));
        return true;
    }
    return false;
}

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (message.author && message.author.bot && message.embeds.length > 0) {
            const embed = message.embeds[0];
            
            if (embed.title && embed.title.includes('VENTA #')) {
                const deleted = deleteSaleByMessageId(message.id);
                
                if (deleted) {
                    console.log(`✅ Venta eliminada automáticamente (mensaje ID: ${message.id})`);
                }
            }
        }
    }
};