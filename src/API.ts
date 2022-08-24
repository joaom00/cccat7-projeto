import express from 'express'
import ItemRepositoryMemory from './ItemRepositoryMemory'
import PreviewOrder from './PreviewOrder'

const app = express()
app.use(express.json())

app.post('/orderPreview/:postId', async (req, res) => {
  const itemRepository = new ItemRepositoryMemory()
  const previewOrder = new PreviewOrder(itemRepository)
  const output = await previewOrder.execute(req.body)
  res.json(output)
})

app.listen(3000)
