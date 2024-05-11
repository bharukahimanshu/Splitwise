const users = require("../auth/model");
const groups = require("../groups/model");
const expenses = require("./model");

async function newexpense(req, res) {
  try {
    const participants = req.body.participants;
    const payment_type = req.body.type;
    const total_amt = req.body.amt;
    const no_of_participants = participants.length;
    const group = await groups.findById(req.body.groupId);
    let individual_amt;
    const participantsArray = [];

    if (payment_type === "SPLIT_EQUALLY") {
      individual_amt = total_amt / no_of_participants;

      for (const participant of participants) {
        const member = group.members.find(
          (member) => member.id.toString() === participant.id
        );
        if (participant.id === req.body.payerId) {
          new_amt = total_amt - individual_amt;
        } else {
          new_amt = -individual_amt;
        }
        participant.amt = new_amt;
        participantsArray.push(participant);
      }
      group.members = group.members.map((member) => {
        const updatedMember = participantsArray.find(
          (participant) => participant.id === member.id.toString()
        );
        if (updatedMember) {
          current_amt = member.amt;
          member.amt = current_amt + updatedMember.amt;
        }
        return member;
      });
      await group.save();
    }



    if (payment_type === "SPLIT_UNEQUALLY") {
      

      for (const participant of participants) {
        const member = group.members.find(
          (member) => member.id.toString() === participant.id
        );
        if (participant.id === req.body.payerId) {
          new_amt = total_amt - individual_amt;
        } else {
          new_amt = -individual_amt;
        }
        participant.amt = new_amt;
        participantsArray.push(participant);
      }
      group.members = group.members.map((member) => {
        const updatedMember = participantsArray.find(
          (participant) => participant.id === member.id.toString()
        );
        if (updatedMember) {
          current_amt = member.amt;
          member.amt = current_amt + updatedMember.amt;
        }
        return member;
      });
      await group.save();
    }

    const expense = {
      description: req.body.description,
      groupId: req.body.groupId,
      payer: {
        id: req.body.payerId,
        name: req.body.payerName,
        amt: total_amt,
      },
      payment_type: payment_type,
      participants: participantsArray,
      expense_date:req.body.date
    };

    const newexpense = await expenses.create(expense);
    group.expenses.push(newexpense._id);
    await group.save();

    return res
      .status(200)
      .json({ message: "expense created successfully" });
  } catch (error) {
    console.error("expense can't be added", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { newexpense };
