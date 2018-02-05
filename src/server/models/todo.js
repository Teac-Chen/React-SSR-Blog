import mongoose from 'mongoose';

const { Schema } = mongoose;
// const { ObjectId } = Schema;

const TodoSchema = new Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

TodoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

export default mongoose.model('Todo', TodoSchema);
